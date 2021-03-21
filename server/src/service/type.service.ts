import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { TypeDTO } from '../service/dto/type.dto';
import { TypeMapper } from '../service/mapper/type.mapper';
import { TypeRepository } from '../repository/type.repository';

const relationshipNames = [];
relationshipNames.push('reference');

@Injectable()
export class TypeService {
  logger = new Logger('TypeService');

  constructor(@InjectRepository(TypeRepository) private typeRepository: TypeRepository) {}

  async findById(id: string): Promise<TypeDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.typeRepository.findOne(id, options);
    return TypeMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<TypeDTO>): Promise<TypeDTO | undefined> {
    const result = await this.typeRepository.findOne(options);
    return TypeMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<TypeDTO>): Promise<[TypeDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.typeRepository.findAndCount(options);
    const typeDTO: TypeDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(type => typeDTO.push(TypeMapper.fromEntityToDTO(type)));
      resultList[0] = typeDTO;
    }
    return resultList;
  }

  async save(typeDTO: TypeDTO): Promise<TypeDTO | undefined> {
    const entity = TypeMapper.fromDTOtoEntity(typeDTO);
    const result = await this.typeRepository.save(entity);
    return TypeMapper.fromEntityToDTO(result);
  }

  async update(typeDTO: TypeDTO): Promise<TypeDTO | undefined> {
    const entity = TypeMapper.fromDTOtoEntity(typeDTO);
    let id = entity._id;
    if(entity._id == null || entity._id==""){
      throw new HttpException("No puede ir la persona sin id", HttpStatus.BAD_REQUEST);
    }
    const update = await this.typeRepository.update(id, entity);
    const result = await this.findById(entity._id);
    return TypeMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.typeRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
