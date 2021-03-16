import { EntityRepository, Repository } from 'typeorm';
import { Course } from '../domain/course.entity';

@EntityRepository(Course) 
export class CourseRepository extends Repository<Course> {}
