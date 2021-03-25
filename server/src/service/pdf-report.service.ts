import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import { EnrollmentService } from './enrollment.service';
import { EnrollmentDTO } from './dto/enrollment.dto';
import { PersonService } from './person.service';
import { PersonDTO } from './dto/person.dto';

const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

//Required package
var pdf = require("pdf-creator-node");
var fs = require("fs");

// Read HTML Template
var html = fs.readFileSync("template4.html", "utf8");

@Injectable()
export class PdfReportService {

    PATH_JSON_FIREBASE_STORAGE = process.env.PATH_JSON_FIREBASE_STORAGE;
    BUCKET_NAME = process.env.BUCKET_NAME;

    constructor(private enrollmentsService: EnrollmentService,
        private personService: PersonService) { }


    // Actualizar base de datos
    async processAndSaveCertificadoInscripcion(personId, matriculaId) {


        let enrollmentSaved: EnrollmentDTO = await this.enrollmentsService.findById(matriculaId);
        if (!enrollmentSaved) { throw new HttpException("Enrollment doesn't exist", HttpStatus.BAD_REQUEST) };

        let personSaved: PersonDTO = await this.personService.findById(personId);
        if (!personSaved) { throw new HttpException("Enrollment doesn't exist", HttpStatus.BAD_REQUEST) };


        var options = {
            format: "letter",
            orientation: "portrait",
            border: "10mm",
        };

        var users = {
            name: "JHONBA325@HOTMAIL.COM",
            age: "21",
        };

        var document = {
            html: html,
            data: {
                users: users,
            },
            path: "./output27.pdf",
            type: "buffer",
        };
        // By default a file is created but you could switch between Buffer and Streams by using "buffer" or "stream" respectively.

        let dataBuffer: any;
        let fileName: string;

        dataBuffer = await pdf.create(document, options);

        console.log(dataBuffer);

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

        let getUrl = urlPublic;

        /*        
        enrollmentSaved[dataType] = urlPublic;
        const enrollmentUpdated = await this.enrollmentsService.update(enrollmentSaved);
              if (!enrollmentUpdated) throw new HttpException("Enrollment couldn't be updated", HttpStatus.BAD_REQUEST);
      
              if (enrollmentUpdated) {
                  return { messsage: "File uploaded Succesfully" };
              };
       */

        console.log(getUrl);


        return { messsage: "REPORTE CREADO" };




    };



}
