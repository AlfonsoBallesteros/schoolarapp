import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import SendGrid from "@sendgrid/mail";
import Mailgen from "mailgen";

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Injectable()
export class EmailService {

    API_KEY_SENDGRID = process.env.API_KEY_SENDGRID;
    BASE_URL = process.env.BASE_URL;
    CORREO_EMISOR = process.env.CORREO_EMISOR;
    JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL;
    TEMPLATE_VERIFY_EMAIL = process.env.TEMPLATE_VERIFY_EMAIL;
    TEMPLATE_CONFIRM_EMAIL = process.env.TEMPLATE_CONFIRM_EMAIL;

    constructor(private userService: UserService) { SendGrid.setApiKey(this.API_KEY_SENDGRID) }

    async signUp(user: UserDTO): Promise<any> {
        
        const token = jwt.sign({ id: user.id }, this.JWT_SECRET_EMAIL, { expiresIn: '30m' });

        const msg = {
            to: user.email,
            from: {
                name: 'SchoolarApp USCO',
                email: this.CORREO_EMISOR // Use the email address or domain you verified above
            },
            subject: 'Sending with Twilio SendGrid is Fun',
            templateId: this.TEMPLATE_VERIFY_EMAIL,
            dynamic_template_data: {
                /* urlBoton: `${BASE_URL}/api/activate/${token}`, */
                userFirstName: user.firstName,
                userLastName: user.lastName,
                urlToVerify: `${this.BASE_URL}/api/activate/${token}`
            }
        };


        SendGrid.send(msg)
            .then(resp => console.log('Email sent...'))
            .catch(error => { console.log(error.message); throw new HttpException("Email couldn't be sent", HttpStatus.BAD_REQUEST) });
    }


    async validateEmail(token: string): Promise<any> {

        let { id }: any = jwt.verify(token, this.JWT_SECRET_EMAIL);
        let userSaved: UserDTO = await this.userService.findById(id);
        if (!userSaved) { throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST) };
        if (userSaved.activated === true) { throw new HttpException("This user has already been activated", HttpStatus.BAD_REQUEST) };

        userSaved.activated = true;
        const userUpdated = await this.userService.update(userSaved);
        if (!userUpdated) throw new HttpException("User couldn't be updated", HttpStatus.BAD_REQUEST);

        if (userUpdated) {
            const msg = {
                to: userUpdated.email,
                from: {
                    name: 'SchoolarApp USCO',
                    email: this.CORREO_EMISOR // Use the email address or domain you verified above
                },
                subject: 'Sending with Twilio SendGrid is Fun',
                templateId: this.TEMPLATE_CONFIRM_EMAIL,
                dynamic_template_data: {
                    /* urlBoton: `${BASE_URL}/api/activate/${token}`, */
                    userFirstName: userUpdated.firstName,
                    userLastName: userUpdated.lastName,
                    urlToVerify: `${this.BASE_URL}/api/activate/${token}`
                }
            };
            await SendGrid.send(msg)
                .then(resp => console.log('Confirm Email sent...'))
                .catch(error => { console.log(error.message); throw new HttpException("Email couldn't be sent", HttpStatus.BAD_REQUEST) });
        };

        return { messsage: "Verified User" };
    }




}
