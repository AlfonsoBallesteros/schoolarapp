import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from '../service/dto/user-login.dto';
import { Payload } from '../security/payload.interface';
import { AuthorityRepository } from '../repository/authority.repository';
import { UserService } from '../service/user.service';
import { UserDTO } from './dto/user.dto';

const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class AuthService {
    logger = new Logger('AuthService');
    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(AuthorityRepository) private authorityRepository: AuthorityRepository,
        private userService: UserService
    ) { }

    async login(userLogin: UserLoginDTO): Promise<any> {
        const loginUserName = userLogin.username;
        const loginPassword = userLogin.password;

        const userFind = await this.userService.findByfields({ where: { login: loginUserName, password: loginPassword } });
        if (!userFind) {
            throw new HttpException('Invalid login name or password!', HttpStatus.BAD_REQUEST);
        }

        if (userFind && !userFind.activated) {
            throw new HttpException('Your account is not been activated!', HttpStatus.BAD_REQUEST);
        }

        const user = await this.findUserWithAuthById(userFind.id);

        const payload: Payload = { id: user.id, username: user.login, authorities: user.authorities };

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
        const userDTO: UserDTO = await this.findUserWithAuthById(userId);
        if (!userDTO) {
            return;
        }
        return userDTO;
    }

    async changePassword(userLogin: string, currentClearTextPassword: string, newPassword: string): Promise<void> {
        const userFind: UserDTO = await this.userService.findByfields({ where: { login: userLogin } });
        if (!userFind) {
            throw new HttpException('Invalid login name!', HttpStatus.BAD_REQUEST);
        }
        if (userFind.password !== currentClearTextPassword) {
            throw new HttpException('Invalid password!', HttpStatus.BAD_REQUEST);
        }
        userFind.password = newPassword;
        await this.userService.save(userFind);
        return;
    }

    async registerNewUser(newUser: UserDTO): Promise<UserDTO> {
        let userFind: UserDTO = await this.userService.findByfields({ where: { login: newUser.login } });
        if (userFind) {
            throw new HttpException('Login name already used!', HttpStatus.BAD_REQUEST);
        }
        userFind = await this.userService.findByfields({ where: { email: newUser.email } });
        if (userFind) {
            throw new HttpException('Email is already in use!', HttpStatus.BAD_REQUEST);
        }
        newUser.authorities = ['ROLE_USER'];
        const user: UserDTO = await this.userService.save(newUser);
        return user;
    }

    async uploadFiles(req: any): Promise<any> {

        const filesData = req.files;

        let { userId, matriculaId, dataType } = req.body
        let fileType: string;


        if (!filesData) {
            throw new HttpException('No hay DATOS', HttpStatus.BAD_REQUEST);
        }

        // Validar tipos
        const tiposValidosMatricula = ["hospitales", "medicos", "usuarios"];

        if (tiposValidosMatricula.includes(dataType)) {
            this.processAndSaveMatriculaFiles(userId, matriculaId, dataType, filesData)
        } else {
            throw new HttpException('No es un documento valido', HttpStatus.BAD_REQUEST)
        }

        /*         
                else if (tiposValidosPdf.includes(dataType)) {
                    fileType = "pdf";
                } else {
                    throw new HttpException('No es un documento valido', HttpStatus.BAD_REQUEST)
                }
         */

        /* 
                if ((tiposValidosImage.some((element) => element in filesData))) {
                    fileType = "image";
                    indexNumber = tiposValidosImage.indexOf(Object.keys(filesData)[0]);
                    dataType = tiposValidosImage[indexNumber];
                } else if ((tiposValidosPdf.some((element) => element in filesData))) {
                    fileType = "pdf"
                    indexNumber = tiposValidosPdf.indexOf(Object.keys(filesData)[0]);
                    dataType = tiposValidosPdf[indexNumber];
                } else {
                    throw new HttpException('No es un documento valido', HttpStatus.BAD_REQUEST)
                }
         */

        return;
    }

    // Actualizar base de datos
    processAndSaveMatriculaFiles(userId, matriculaId, dataType, fileData) {

        let file = fileData.filetosave;

        if (!file || Object.keys(file).length === 0) {
            throw new HttpException('No hay un archivo cargado', HttpStatus.BAD_REQUEST);
        }

        // Procesar la imagen
        const file_process = file;

        const nombreCortado = file_process.name.split(".");
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        // Validar extension
        const extensionesValidas = ["png", "jpg", "jpeg", "gif", "pdf"];

        if (!extensionesValidas.includes(extensionArchivo)) {
            throw new HttpException('La archivo subido, no tiene una extension permitida', HttpStatus.BAD_REQUEST);
        }

        // Generar el nombre del archivo
        file.name = `${dataType}_${userId}.${extensionArchivo}`;

        // Generar path del archivo
        const path_image = `${userId}/2021-A/${file.name}`;


        const storage = new Storage({
            keyFilename: 'quickstart-storage-412b9-firebase-adminsdk-lbg2o-842c580d98.json',
        });

        let bucketName = 'gs://quickstart-storage-412b9.appspot.com'


        const uploadFile = async () => {
            const uuid = uuidv4();
            const { name, data } = file;
            const prueba = await storage.bucket(bucketName).file(path_image).save(data, {
                gzip: true,
                public: true,
                metadata: {
                    metadata: {
                        firebaseStorageDownloadTokens: uuid,
                    },
                    cacheControl: 'no-cache',
                },
            });
            const urlPublic = await storage.bucket(bucketName).file(path_image).publicUrl();
            return urlPublic
        }

        console.log(path_image);

        uploadFile().then(resp => console.log('IMAGEN SUBIDA', resp))
            .catch(error => console.log(error));


        const file2 = storage.bucket(bucketName).file('pruebas_cabronas/1.png');

        /* 
                file2.getMetadata(function (err, metadata, apiResponse) { });
        
                //-
                // If the callback is omitted, we'll return a Promise.
                //-
                file2.getMetadata().then(function (data) {
                    console.log(data[0]);
                    const metadata = data[0];
                    const apiResponse = data[1];
                });
        
        
                const urlPublic = await storage.bucket(bucketName).file('otropross/jhonprueba_32312321.png').publicUrl();
                console.log(urlPublic);
         */


    };


    /*  processAndSavePdf(userId, matriculaId, dataType, fileData) {
 
         let pdf = fileData.pdf;
 
         if (!pdf || Object.keys(pdf).length === 0) {
             throw new HttpException('No hay un pdf', HttpStatus.BAD_REQUEST);
         }
 
         // Procesar la imagen
         const file_process = pdf;
 
         const nombreCortado = file_process.name.split(".");
         const extensionArchivo = nombreCortado[nombreCortado.length - 1];
 
         // Validar extension
         const extensionesValidas = ["pdf"];
 
         if (!extensionesValidas.includes(extensionArchivo)) {
             throw new HttpException('El pdf subido, no tiene una extension permitida', HttpStatus.BAD_REQUEST);
         }
 
         // Generar el nombre del archivo
         pdf.name = `${dataType}_${userId}.${extensionArchivo}`;
 
         // Generar path del archivo
         const path_pdf = `${userId}/${pdf.name}`;
 
 
         const storage = new Storage({
             keyFilename: 'quickstart-storage-412b9-firebase-adminsdk-lbg2o-842c580d98.json',
         });
 
         let bucketName = 'gs://quickstart-storage-412b9.appspot.com'
 
 
         const uploadFile = async () => {
             const uuid = uuidv4();
 
             const { name, data } = pdf;
             const prueba = await storage.bucket(bucketName).file(path_pdf).save(data, {
                 gzip: true,
                 public: true,
                 metadata: {
                     metadata: {
                         firebaseStorageDownloadTokens: uuid,
                     },
                     cacheControl: 'no-cache',
                 },
             });
 
             const urlPublic = await storage.bucket(bucketName).file(path_pdf).publicUrl();
             console.log(urlPublic);
 
         }
 
         console.log(path_pdf);
 
         uploadFile().then(resp => console.log('IMAGEN SUBIDA'))
             .catch(error => console.log(error));
 
 
     } */

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
        await this.userService.save(userFind);
        return;
    }
}
