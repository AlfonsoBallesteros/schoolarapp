import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PersonDTO } from '../service/dto/person.dto';
import { PersonMapper } from '../service/mapper/person.mapper';
import { PersonRepository } from '../repository/person.repository';

const relationshipNames = [];
relationshipNames.push('typeId');
relationshipNames.push('gender');
relationshipNames.push('neighborhood');
relationshipNames.push('city');
relationshipNames.push('birthplace');
relationshipNames.push('nacionality');
relationshipNames.push('cityExp');
relationshipNames.push('rh');
relationshipNames.push('eps');
relationshipNames.push('relation');
relationshipNames.push('courses');

@Injectable()
export class PersonService {
  logger = new Logger('PersonService');

  constructor(@InjectRepository(PersonRepository) private personRepository: PersonRepository) {}

  async findById(id: string): Promise<PersonDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.personRepository.findOne(id, options);
    return PersonMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<PersonDTO>): Promise<PersonDTO | undefined> {
    const result = await this.personRepository.findOne(options);
    return PersonMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<PersonDTO>): Promise<[PersonDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.personRepository.findAndCount(options);
    const personDTO: PersonDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(person => personDTO.push(PersonMapper.fromEntityToDTO(person)));
      resultList[0] = personDTO;
    }
    return resultList;
  }

  async save(personDTO: PersonDTO): Promise<PersonDTO | undefined> {
    const entity = PersonMapper.fromDTOtoEntity(personDTO);
    const result = await this.personRepository.save(entity);
    return PersonMapper.fromEntityToDTO(result);
  }

  async update(personDTO: PersonDTO): Promise<PersonDTO | undefined> {
    const entity = PersonMapper.fromDTOtoEntity(personDTO);
    const result = await this.personRepository.save(entity);
    return PersonMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.personRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
