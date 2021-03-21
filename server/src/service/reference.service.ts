import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { ReferenceDTO } from '../service/dto/reference.dto';
import { ReferenceMapper } from '../service/mapper/reference.mapper';
import { ReferenceRepository } from '../repository/reference.repository';

const relationshipNames = [];

@Injectable()
export class ReferenceService {
  logger = new Logger('ReferenceService');

  constructor(@InjectRepository(ReferenceRepository) private referenceRepository: ReferenceRepository) {}

  async findById(id: string): Promise<ReferenceDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.referenceRepository.findOne(id, options);
    return ReferenceMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<ReferenceDTO>): Promise<ReferenceDTO | undefined> {
    const result = await this.referenceRepository.findOne(options);
    return ReferenceMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<ReferenceDTO>): Promise<[ReferenceDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.referenceRepository.findAndCount(options);
    const referenceDTO: ReferenceDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(reference => referenceDTO.push(ReferenceMapper.fromEntityToDTO(reference)));
      resultList[0] = referenceDTO;
    }
    return resultList;
  }

  async save(referenceDTO: ReferenceDTO): Promise<ReferenceDTO | undefined> {
    const entity = ReferenceMapper.fromDTOtoEntity(referenceDTO);
    const result = await this.referenceRepository.save(entity);
    return ReferenceMapper.fromEntityToDTO(result);
  }

  async update(referenceDTO: ReferenceDTO): Promise<ReferenceDTO | undefined> {
    const entity = ReferenceMapper.fromDTOtoEntity(referenceDTO);
    let id = entity._id;
    if(entity._id == null || entity._id==""){
      throw new HttpException("No puede ir la persona sin id", HttpStatus.BAD_REQUEST);
    }
    const update = await this.referenceRepository.update(id, entity);
    const result = await this.findById(entity._id);
    return ReferenceMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.referenceRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
