import { EntityRepository, Repository } from 'typeorm';
import { Enrollment } from '../domain/enrollment.entity';

@EntityRepository(Enrollment)
export class EnrollmentRepository extends Repository<Enrollment> {}
