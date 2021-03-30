import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { PersonDTO } from '../service/dto/person.dto';
import { PersonMapper } from '../service/mapper/person.mapper';
import { PersonRepository } from '../repository/person.repository';
import { UpdatePersonDto } from './dto/update-person.dto';

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
    if(personDTO._id != null){
      throw new HttpException("La nueva persona no puede tener un id", HttpStatus.BAD_REQUEST);
    }
    const entity = PersonMapper.fromDTOtoEntity(personDTO);
    try{
      let personFind: PersonDTO = await this.findByfields({where: {documentId: entity.documentId}}) 
      
      if(personFind){
        console.log(personFind);
        throw new HttpException("El documento ya existe!", HttpStatus.BAD_REQUEST);
      }
      const result = await this.personRepository.save(entity);
      return PersonMapper.fromEntityToDTO(result);
    }catch{
      throw new HttpException('Documento ya existe!', HttpStatus.BAD_REQUEST);
    }
  }

  async update(personDTO: UpdatePersonDto): Promise<PersonDTO | undefined> {
    const entity = PersonMapper.fromDTOtoEntity(personDTO);
    let id = entity._id;
    /*const{_id, documentId, ...UpdatePersonDto} = entity */
    if(entity._id == null || entity._id==""){
      throw new HttpException("No puede ir la persona sin id", HttpStatus.BAD_REQUEST);
    }
    const update = await this.personRepository.update(id, entity);
    const result = await this.personRepository.findOneOrFail(entity._id);
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

  async findParents(id: String): Promise<PersonDTO[] | undefined>{
    const resultList = await this.personRepository.find({where: {parent: id}});
    return resultList;
  }
}
