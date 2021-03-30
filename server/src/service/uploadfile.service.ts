import { HttpException, HttpStatus, Injectable } from '@nestjs/common';


import { EnrollmentService } from './enrollment.service';
import { EnrollmentDTO } from './dto/enrollment.dto';
import { UploadFileDto } from './dto/upload-file.dto';

const path = require('path');


const { v4: uuidv4 } = require('uuid');
const { Storage } = require('@google-cloud/storage');

@Injectable()
export class UploadFileService {

    PATH_JSON_FIREBASE_STORAGE = process.env.PATH_JSON_FIREBASE_STORAGE;
    BUCKET_NAME = process.env.BUCKET_NAME;

    constructor(private enrollmentsService: EnrollmentService) { }


    async uploadFiles(req: any, uploadFileDto: UploadFileDto): Promise<any> {
        const filesData = req.files;
        let { personId, matriculaId, dataType } = uploadFileDto;

        if (!filesData) {
            throw new HttpException('No hay DATOS en el file', HttpStatus.BAD_REQUEST);
        }

        // Validar tipos
        const tiposValidosMatricula = ["docStudentFile", "docDadFile", "docMomFile", "docTutorFile", "academicFile", "peaceSafeFile"];

        if (tiposValidosMatricula.includes(dataType)) {
            return this.processAndSaveMatriculaFiles(personId, matriculaId, dataType, filesData)
        } else {
            throw new HttpException('No es un documento valido', HttpStatus.BAD_REQUEST)
        }

    }


    // Actualizar base de datos
    async processAndSaveMatriculaFiles(personId, matriculaId, dataType, fileData: UploadFileDto) {

        let file = fileData.filetosave;
        let size: number = (file.size) / 1000;
        console.log(file);

        if (!file || Object.keys(file).length === 0) {
            throw new HttpException('No hay un archivo cargado', HttpStatus.BAD_REQUEST);
        }

        if (size > 512) {
            throw new HttpException('El archivo supera el peso de 512 kb', HttpStatus.BAD_REQUEST);
        }


        // Procesar la imagen
        const file_process = file;

        const nombreCortado = file_process.name.split(".");
        const extensionArchivo = nombreCortado[nombreCortado.length - 1];

        // Validar extension
        const extensionesValidas = ["png", "jpg", "jpeg", "gif", "pdf"];

        if (!extensionesValidas.includes(extensionArchivo)) {
            throw new HttpException('El archivo subido, no tiene una extension permitida', HttpStatus.BAD_REQUEST);
        }

        let enrollmentSaved: EnrollmentDTO = await this.enrollmentsService.findById(matriculaId);
        if (!enrollmentSaved) { throw new HttpException("Enrollment doesn't exist", HttpStatus.BAD_REQUEST) };

        // Generar el nombre del archivo
        file.name = `${dataType}_${personId}.${extensionArchivo}`;

        // Generar path del archivo
        const path_image = `${personId}/${enrollmentSaved.year}/${file.name}`;

        // Guardar archivo en Firebase
        const storage = new Storage({
            keyFilename: this.PATH_JSON_FIREBASE_STORAGE
        });
        let bucketName = this.BUCKET_NAME;

        const uuid = uuidv4();
        const { data } = file;
        await storage.bucket(bucketName).file(path_image).save(data, {
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

        enrollmentSaved[dataType] = urlPublic;
        const enrollmentUpdated = await this.enrollmentsService.update(enrollmentSaved);
        if (!enrollmentUpdated) throw new HttpException("Enrollment couldn't be updated", HttpStatus.BAD_REQUEST);

        if (enrollmentUpdated) {
            return { messsage: "File uploaded Succesfully" };
        };

    };



}
