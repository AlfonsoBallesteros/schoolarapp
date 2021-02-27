import { EntityRepository, Repository } from 'typeorm';
import { Type } from '../domain/type.entity';

@EntityRepository(Type)
export class TypeRepository extends Repository<Type> {}
