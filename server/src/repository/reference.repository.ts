import { EntityRepository, Repository } from 'typeorm';
import { Reference } from '../domain/reference.entity';

@EntityRepository(Reference)
export class ReferenceRepository extends Repository<Reference> {}
