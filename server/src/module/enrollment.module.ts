import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from '../web/rest/enrollment.controller';
import { EnrollmentRepository } from '../repository/enrollment.repository';
import { EnrollmentService } from '../service/enrollment.service';
import { UploadFileService } from '../service/uploadfile.service';

const fileUpload = require('express-fileupload');

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentRepository])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, UploadFileService],
  exports: [EnrollmentService]
})
export class EnrollmentModule {

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(fileUpload())
      .forRoutes(EnrollmentController);
  }
}
