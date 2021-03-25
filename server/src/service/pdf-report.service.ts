import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import { EnrollmentService } from './enrollment.service';
import { EnrollmentDTO } from './dto/enrollment.dto';
import { PersonService } from './person.service';
import { PersonDTO } from './dto/person.dto';
import { EnrollmentRepository } from '../repository/enrollment.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { EnrollmentMapper } from './mapper/enrollment.mapper';
import { TypeService } from './type.service';
import { TypeDTO } from './dto/type.dto';
import { State } from '../domain/enumeration/state';
import { EmailService } from './email.service';
import { AuthService } from './auth.service';

const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync(process.env.VIEW_PATH_REPORT_PDF, "utf8");

@Injectable()
export class PdfReportService {

    PATH_JSON_FIREBASE_STORAGE = process.env.PATH_JSON_FIREBASE_STORAGE;
    BUCKET_NAME = process.env.BUCKET_NAME;

    constructor(@InjectRepository(EnrollmentRepository) private enrollmentRepository: EnrollmentRepository,
        private personService: PersonService,
        private typeService: TypeService,
        private emailService: EmailService,
        private authService: AuthService) { }


    // Actualizar base de datos
    async processAndSaveCertificadoInscripcion(userId, personId, matriculaId) {

        const userDto = await this.authService.getAccount(userId);

        const resultEnrollment = await this.enrollmentRepository.findOne(matriculaId);
        let enrollmentSaved: EnrollmentDTO = EnrollmentMapper.fromEntityToDTO(resultEnrollment);
        if (!enrollmentSaved) { throw new HttpException("Enrollment doesn't exist", HttpStatus.BAD_REQUEST) };

        let personSaved: PersonDTO = await this.personService.findById(personId);
        if (!personSaved) { throw new HttpException("Person doesn't exist", HttpStatus.BAD_REQUEST) };

        let gradeTypeSaved: TypeDTO = await this.typeService.findById(enrollmentSaved.gradeProx);
        if (!gradeTypeSaved) { throw new HttpException("Grade type doesn't exist", HttpStatus.BAD_REQUEST) };

        let workingDayTypeSaved: TypeDTO = await this.typeService.findById(enrollmentSaved.workingDay);
        if (!workingDayTypeSaved) { throw new HttpException("Grade type doesn't exist", HttpStatus.BAD_REQUEST) };

        let date = new Date()

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate: string;

        if (month < 10) {
            currentDate = `${day}-0${month}-${year}`;
        } else {
            currentDate = `${day}-${month}-${year}`;
        }

        var options = {
            format: "letter",
            orientation: "portrait",
            border: "10mm",
        };

        var document = {
            html: html,
            data: {
                dataEstudiante: personSaved,
                dataMatricula: enrollmentSaved,
                dataGrado: gradeTypeSaved.name,
                dataWorkingDay: workingDayTypeSaved.name,
                dataFechaInscripcion: currentDate
            },
            type: "buffer",
        };
        // By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

        let dataBuffer: any;
        let fileName: string;

        dataBuffer = await pdf.create(document, options);

        // Generar el nombre del archivo
        fileName = `certificadoInscripcion_${personId}.pdf`;

        // Generar path del archivo
        const path_image = `${personId}/${enrollmentSaved.year}/${fileName}`;

        // Guardar archivo en Firebase
        const storage = new Storage({
            keyFilename: this.PATH_JSON_FIREBASE_STORAGE
        });
        let bucketName = this.BUCKET_NAME;

        const uuid = uuidv4();
        await storage.bucket(bucketName).file(path_image).save(dataBuffer, {
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

        enrollmentSaved['docRegistrationCertificate'] = urlPublic;
        enrollmentSaved['state'] = State.PENDIENTE;

        const entity = EnrollmentMapper.fromDTOtoEntity(enrollmentSaved);
        let id = entity._id;
        //const{_id, ...UpdateEnrollmentDto} = entity
        if (entity._id == null || entity._id == "") {
            throw new HttpException("No puede ir la matricula sin id", HttpStatus.BAD_REQUEST);
        }
        const update = await this.enrollmentRepository.update(id, entity);

        const result = await this.enrollmentRepository.findOne(id);
        let enrollmentUpdated = EnrollmentMapper.fromEntityToDTO(result);

        if (!enrollmentUpdated) throw new HttpException("Enrollment couldn't be updated", HttpStatus.BAD_REQUEST);

        console.log(urlPublic);

        await this.emailService.sendEmailReportPdfEnrollment(userDto, enrollmentUpdated);

        return enrollmentUpdated;


    };



}
