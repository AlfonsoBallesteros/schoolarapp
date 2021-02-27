import { EntityRepository, Repository } from 'typeorm';
import { Person } from '../domain/person.entity';

@EntityRepository(Person)
export class PersonRepository extends Repository<Person> {}
