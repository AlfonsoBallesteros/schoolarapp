import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseController } from '../web/rest/course.controller';
import { CourseRepository } from '../repository/course.repository';
import { CourseService } from '../service/course.service';

@Module({
  imports: [TypeOrmModule.forFeature([CourseRepository])],
  controllers: [CourseController],
  providers: [CourseService],
  exports: [CourseService]
})
export class CourseModule {}
