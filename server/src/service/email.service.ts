import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import * as jwt from 'jsonwebtoken';
import SendGrid from "@sendgrid/mail";

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';
import { EnrollmentDTO } from './dto/enrollment.dto';

var pdf2base64 = require('pdf-to-base64');

@Injectable()
export class EmailService {

    API_KEY_SENDGRID = process.env.API_KEY_SENDGRID;
    BASE_URL = process.env.BASE_URL;
    CORREO_EMISOR = process.env.CORREO_EMISOR;
    JWT_SECRET_EMAIL = process.env.JWT_SECRET_EMAIL;
    TEMPLATE_VERIFY_EMAIL = process.env.TEMPLATE_VERIFY_EMAIL;
    TEMPLATE_CONFIRM_EMAIL = process.env.TEMPLATE_CONFIRM_EMAIL;
    TEMPLATE_PDF_REPORT_EMAIL = process.env.TEMPLATE_PDF_REPORT_EMAIL;

    constructor(private userService: UserService) { SendGrid.setApiKey(this.API_KEY_SENDGRID) }

    async signUp(user: UserDTO): Promise<any> {

        const token = jwt.sign({ id: user._id }, this.JWT_SECRET_EMAIL, { expiresIn: '30m' });

        const msg = {
            to: user.email,
            from: {
                name: 'SchoolarApp USCO',
                email: this.CORREO_EMISOR // Use the email address or domain you verified above
            },
            subject: 'Sending with Twilio SendGrid is Fun',
            templateId: this.TEMPLATE_VERIFY_EMAIL,
            dynamic_template_data: {
                userFirstName: user.firstName,
                userLastName: user.lastName,
                urlToVerify: `${this.BASE_URL}/auth/${token}`
            }
        };


        SendGrid.send(msg)
            .then(resp => console.log('Email sent...'))
            .catch(error => { console.log(error.message); throw new HttpException("Email no se puede enviar", HttpStatus.BAD_REQUEST) });
    }


    async validateEmail(token: string): Promise<any> {

        let { id }: any = jwt.verify(token, this.JWT_SECRET_EMAIL);
        let userSaved: UserDTO = await this.userService.findById(id);
        if (!userSaved) { throw new HttpException(`El usuario ${userSaved._id} no existe`, HttpStatus.BAD_REQUEST) };
        if (userSaved.activated === true) { throw new HttpException("Este usuario ya ha sido activado", HttpStatus.BAD_REQUEST) };

        userSaved.activated = true;
        const userUpdated = await this.userService.update(userSaved);
        if (!userUpdated) throw new HttpException("El usuario no se puede actualizar", HttpStatus.BAD_REQUEST);

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
                    userFirstName: userUpdated.firstName,
                    userLastName: userUpdated.lastName,
                    urlToVerify: `${this.BASE_URL}/api/activate/${token}`
                }
            };
            await SendGrid.send(msg)
                .then(resp => console.log('Confirm Email sent...'))
                .catch(error => { console.log(error.message); throw new HttpException("Email no se puede enviar", HttpStatus.BAD_REQUEST) });
        };

        return { messsage: `El usuario ${userSaved.email} ha sido autenticado` };
    }

    async sendEmailReportPdfEnrollment(user: UserDTO, enrollment: EnrollmentDTO): Promise<any> {

        const token = jwt.sign({ id: user._id }, this.JWT_SECRET_EMAIL, { expiresIn: '30m' });

        let certificadoInscripcion = await pdf2base64(enrollment.docRegistrationCertificate);
        let politicaDatos = await pdf2base64('https://storage.googleapis.com/schoolarapp-a9f3b.appspot.com/PoliticasDatos/SchoolarApp_PoliticaTratamientoDeDatos.pdf');
        let ManualConvivencia = await pdf2base64('https://storage.googleapis.com/schoolarapp-a9f3b.appspot.com/ManualConvivencia/ManualConvivencia.pdf');

        const msg = {
            to: user.email,
            from: {
                name: 'SchoolarApp USCO',
                email: this.CORREO_EMISOR // Use the email address or domain you verified above
            },
            subject: 'Sending with Twilio SendGrid is Fun',
            templateId: this.TEMPLATE_PDF_REPORT_EMAIL,
            dynamic_template_data: {
                userFirstName: user.firstName,
                userLastName: user.lastName
            },
            attachments: [
                {
                    content: certificadoInscripcion,
                    filename: "Certificado_Inscripcion.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                },
                {
                    content: politicaDatos,
                    filename: "Politica_Datos.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                },
                {
                    content: ManualConvivencia,
                    filename: "Manual_Convivencia.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                }
            ]
        };


        SendGrid.send(msg)
            .then(resp => console.log('Email report pdf sent...'))
            .catch(error => { console.log(error.message); throw new HttpException("Email no se puede enviar", HttpStatus.BAD_REQUEST) });
    }





}
