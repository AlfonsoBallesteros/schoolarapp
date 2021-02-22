import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import SendGrid from "@sendgrid/mail";

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class EmailService {

    constructor(private userService: UserService) { }

    async signUp(user: UserDTO): Promise<any> {

        const BASE_URL = process.env.BASE_URL;
        const CORREO_EMISOR = process.env.CORREO_EMISOR;
        const API_KEY_SENDGRID = process.env.API_KEY_SENDGRID;
        const JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL;

        SendGrid.setApiKey(API_KEY_SENDGRID);

        const token = jwt.sign({ id: user.id }, JWT_SECRET_EMAIL, { expiresIn: '30m' });

        const output = `
        <h2>Please click on below link to activate your account</h2>
        <p><a href="${BASE_URL}/api/activate/${token}">ACTIVA TU CUENTA</p></a>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;


        const msg = {
            to: user.email,
            from: {
                name: 'SchoolarApp USCO',
                email: CORREO_EMISOR // Use the email address or domain you verified above
            },
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: output,
        };

        SendGrid.send(msg)
            .then(resp => console.log('Email sent...'))
            .catch(error => { console.log(error.message); throw new HttpException("Email couldn't be sent", HttpStatus.BAD_REQUEST) });
    }


    async validateEmail(token: string): Promise<any> {

        const JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL;

        try {

            let { id }: any = jwt.verify(token, JWT_SECRET_EMAIL);
            let userSaved: UserDTO = await this.userService.findById(id);
            if (!userSaved) throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);

            userSaved.activated = true;
            const userUpdated = await this.userService.update(userSaved);
            if (!userUpdated) throw new HttpException("User couldn't be updated", HttpStatus.BAD_REQUEST);

            return { messsage: "Verified User" };

        } catch (error) {
            return error;
        }

    }




}
