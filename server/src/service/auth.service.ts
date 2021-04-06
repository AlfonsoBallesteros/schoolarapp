import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../service/dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserService } from '../service/user.service';
import { UserDTO } from './dto/user.dto';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';
import { PersonRepository } from '../repository/person.repository';

@Injectable()
export class AuthService {


    PATH_JSON_FIREBASE_STORAGE = process.env.PATH_JSON_FIREBASE_STORAGE;
    BUCKET_NAME = process.env.BUCKET_NAME;

    logger = new Logger('AuthService');
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
        @InjectRepository(PersonRepository) private personRepository: PersonRepository,
        private userService: UserService,
        private emailService: EmailService
    ) { }

    async login(userLogin: UserLoginDTO): Promise<any> {
        const loginUserName = userLogin.username;
        const loginPassword = userLogin.password;

        const userFind = await this.userService.findByfields({ where: { login: loginUserName } });
        if (!userFind) {
            throw new HttpException('Invalida usuario o contraseña', HttpStatus.BAD_REQUEST);
        }

        if (userFind && !userFind.activated) {
            throw new HttpException('Tu cuenta no esta activada', HttpStatus.BAD_REQUEST);
        }
        if (!bcrypt.compareSync(loginPassword, userFind.password)) {
            throw new HttpException('Invalida usuario o contraseña!', HttpStatus.BAD_REQUEST);
        }
        const user = await this.findUserWithAuthById(userFind._id);

        const payload: Payload = { id: user._id, username: user.login, authorities: user.authorities };

        /* eslint-disable */
        return {
            id_token: this.jwtService.sign(payload)
        };
    }

    /* eslint-enable */
    async validateUser(payload: Payload): Promise<UserDTO | undefined> {
        return await this.findUserWithAuthById(payload.id);
    }

    async findUserWithAuthById(userId: string): Promise<UserDTO | undefined> {
        const userDTO: UserDTO = await this.userService.findById(userId);
        return userDTO;
    }

    async getAccount(userId: string): Promise<UserDTO | undefined> {
        let userDTO: UserDTO = await this.findUserWithAuthById(userId);
        if (!userDTO) {
            return;
        }
        if (userDTO.person) {
            let dataPerson = await this.personRepository.findOne(userDTO.person);
            if (!dataPerson) {
                throw new HttpException('No se encontró una persona relacionada con el usuario actual!', HttpStatus.BAD_REQUEST);
            }
            userDTO.person = dataPerson;
        }
        return userDTO;
    }

    async changePassword(userLogin: string, currentClearTextPassword: string, newPassword: string): Promise<void> {
        const userFind: UserDTO = await this.userService.findByfields({ where: { login: userLogin } });
        if (!userFind) {
            throw new HttpException('Invalido login!', HttpStatus.BAD_REQUEST);
        }
        if (userFind.password !== currentClearTextPassword) {
            throw new HttpException('Invalida password!', HttpStatus.BAD_REQUEST);
        }
        const saltOrRounds = 10;
        userFind.password = await bcrypt.hash(newPassword, saltOrRounds);;
        await this.userService.update(userFind);
        return;
    }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByfields({ where: { login: newUser.login } });
        if (userFind) {
            throw new HttpException('Login ya es usado!', HttpStatus.BAD_REQUEST);
        }
        userFind = await this.userService.findByfields({ where: { email: newUser.email } });
        if (userFind) {
            throw new HttpException('Email ya esta siendo utilizado!', HttpStatus.BAD_REQUEST);
        }
        newUser.authorities = ['ROLE_STUDENT'];
        newUser.activated = false;
        const user: UserDTO = await this.userService.save(newUser);
        await this.emailService.signUp(user);
        return user;
    }

    async updateUserSettings(userLogin: string, newUserInfo: UserDTO): Promise<UserDTO> {
        const userFind: UserDTO = await this.userService.findByfields({ where: { login: userLogin } });
        if (!userFind) {
            throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
        }
        if (userFind.email && userFind.email !== newUserInfo.email) {
            throw new HttpException('Email is already in use!', HttpStatus.BAD_REQUEST);
        }

        userFind.firstName = newUserInfo.firstName;
        userFind.lastName = newUserInfo.lastName;
        userFind.email = newUserInfo.email;
        return await this.userService.update(userFind);;
    }
}
