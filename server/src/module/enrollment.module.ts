import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnrollmentController } from '../web/rest/enrollment.controller';
import { EnrollmentRepository } from '../repository/enrollment.repository';
import { EnrollmentService } from '../service/enrollment.service';

@Module({
  imports: [TypeOrmModule.forFeature([EnrollmentRepository])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService],
  exports: [EnrollmentService]
})
export class EnrollmentModule {}
