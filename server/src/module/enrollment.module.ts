import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from '../web/rest/enrollment.controller';
import { EnrollmentRepository } from '../repository/enrollment.repository';
import { EnrollmentService } from '../service/enrollment.service';
import { UploadFileService } from '../service/uploadfile.service';
import { PersonModule } from './person.module';
import { PdfReportService } from '../service/pdf-report.service';
import { TypeService } from '../service/type.service';
import { TypeModule } from './type.module';

const fileUpload = require('express-fileupload');

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentRepository]),
    PersonModule,
    TypeModule
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, UploadFileService, PdfReportService],
  exports: [EnrollmentService]
})
export class EnrollmentModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fileUpload())
      .forRoutes(EnrollmentController);
  }
}
