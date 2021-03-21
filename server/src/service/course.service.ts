import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { CourseDTO } from '../service/dto/course.dto';
import { CourseMapper } from '../service/mapper/course.mapper';
import { CourseRepository } from '../repository/course.repository';

const relationshipNames = [];
relationshipNames.push('teacher');

@Injectable()
export class CourseService {
  logger = new Logger('CourseService');

  constructor(@InjectRepository(CourseRepository) private courseRepository: CourseRepository) {}

  async findById(id: string): Promise<CourseDTO | undefined> {
    const options = { relations: relationshipNames };
    const result = await this.courseRepository.findOne(id, options);
    return CourseMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<CourseDTO>): Promise<CourseDTO | undefined> {
    const result = await this.courseRepository.findOne(options);
    return CourseMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<CourseDTO>): Promise<[CourseDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.courseRepository.findAndCount(options);
    const courseDTO: CourseDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(course => courseDTO.push(CourseMapper.fromEntityToDTO(course)));
      resultList[0] = courseDTO;
    }
    return resultList;
  }

  async save(courseDTO: CourseDTO): Promise<CourseDTO | undefined> {
    const entity = CourseMapper.fromDTOtoEntity(courseDTO);
    if(entity._id != null){
      throw new HttpException("El nuevo curso no puede tener un id", HttpStatus.BAD_REQUEST);
    }
    const result = await this.courseRepository.save(entity);
    return CourseMapper.fromEntityToDTO(result);
  }

  async update(courseDTO: CourseDTO): Promise<CourseDTO | undefined> {
    const entity = CourseMapper.fromDTOtoEntity(courseDTO);
    let id = entity._id;
    //const{_id, ...CourseDTO} = entity
    if(entity._id == null || entity._id==""){
      throw new HttpException("No puede ir el curso sin id", HttpStatus.BAD_REQUEST);
    }
    const update = await this.courseRepository.update(id, entity);
    const result = await this.findById(entity._id);
    return CourseMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.courseRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
