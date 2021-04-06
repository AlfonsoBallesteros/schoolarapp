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
import { EmailService } from '../service/email.service';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';

const fileUpload = require('express-fileupload');

@Module({
  imports: [
    TypeOrmModule.forFeature([EnrollmentRepository]),
    AuthModule,
    UserModule,
    PersonModule,
    TypeModule
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, UploadFileService, PdfReportService, EmailService],
  exports: [EnrollmentService]
})
export class EnrollmentModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fileUpload())
      .forRoutes(EnrollmentController);
  }
}
