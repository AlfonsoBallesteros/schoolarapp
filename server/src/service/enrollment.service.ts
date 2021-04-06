import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { EnrollmentDTO } from '../service/dto/enrollment.dto';
import { EnrollmentMapper } from '../service/mapper/enrollment.mapper';
import { EnrollmentRepository } from '../repository/enrollment.repository';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { PdfReportService } from './pdf-report.service';
import { PersonService } from './person.service';


const relationshipNames = [];
relationshipNames.push('workShop');
relationshipNames.push('gradeProx');
relationshipNames.push('student');

@Injectable()
export class EnrollmentService {
  logger = new Logger('EnrollmentService');

  constructor(@InjectRepository(EnrollmentRepository) private enrollmentRepository: EnrollmentRepository,
    private personService: PersonService,
    private pdfReportService: PdfReportService) { }

  async findById(id: string): Promise<EnrollmentDTO | undefined> {
    //const options = { relations: relationshipNames };
    const result = await this.enrollmentRepository.findOne(id);
    this.logger.error(result._id);
    return EnrollmentMapper.fromEntityToDTO(result);
  }

  async findByfields(options: FindOneOptions<EnrollmentDTO>): Promise<EnrollmentDTO | undefined> {
    const result = await this.enrollmentRepository.findOne(options);
    return EnrollmentMapper.fromEntityToDTO(result);
  }

  async findAndCount(options: FindManyOptions<EnrollmentDTO>): Promise<[EnrollmentDTO[], number]> {
    options.relations = relationshipNames;
    const resultList = await this.enrollmentRepository.findAndCount(options);
    const enrollmentDTO: EnrollmentDTO[] = [];
    if (resultList && resultList[0]) {
      resultList[0].forEach(enrollment => enrollmentDTO.push(EnrollmentMapper.fromEntityToDTO(enrollment)));
      resultList[0] = enrollmentDTO;
    }
    return resultList;
  }

  async save(userId: string, enrollmentDTO: EnrollmentDTO): Promise<EnrollmentDTO | undefined> {
    if (enrollmentDTO._id != null) {
      throw new HttpException("La nueva matricula no puede tener un id", HttpStatus.BAD_REQUEST);
    }

    const entity = EnrollmentMapper.fromDTOtoEntity(enrollmentDTO);

    // Validar si existe el estudiante que desea crear la matricula
    let checkPerson = await this.personService.findById(entity.student);
    if (!checkPerson) { throw new HttpException("Person doesn't exist", HttpStatus.BAD_REQUEST) };

    // Validar si ya existe un proceso de matricula 
    let checkEnrollment = await this.enrollmentRepository.findOne({ student: entity.student })
    checkEnrollment = EnrollmentMapper.fromEntityToDTO(checkEnrollment);

    if (checkEnrollment) {
      if (checkEnrollment.state === 'PENDIENTE') { throw new HttpException("El estudiante tiene un proceso de matricula pendiente", HttpStatus.BAD_REQUEST) };
    }

    // Si no existe un proceso de matricula con ese estudiante, se crea.
    const enrollmentSaved = await this.enrollmentRepository.save(entity);
    let resultPdfReport = await this.pdfReportService.processAndSaveCertificadoInscripcion(userId, enrollmentSaved.student, enrollmentSaved._id);
    return EnrollmentMapper.fromEntityToDTO(resultPdfReport);
  }

  async update(enrollmentDTO: UpdateEnrollmentDto): Promise<EnrollmentDTO | undefined> {
    const entity = EnrollmentMapper.fromDTOtoEntity(enrollmentDTO);
    let id = entity._id;
    //const{_id, ...UpdateEnrollmentDto} = entity
    if (entity._id == null || entity._id == "") {
      throw new HttpException("No puede ir la matricula sin id", HttpStatus.BAD_REQUEST);
    }
    const update = await this.enrollmentRepository.update(id, entity);
    const result = await this.findById(entity._id);
    return EnrollmentMapper.fromEntityToDTO(result);
  }

  async deleteById(id: string): Promise<void | undefined> {
    await this.enrollmentRepository.delete(id);
    const entityFind = await this.findById(id);
    if (entityFind) {
      throw new HttpException('Error, entity not deleted!', HttpStatus.NOT_FOUND);
    }
    return;
  }

  async findByUser(id: string): Promise<EnrollmentDTO | undefined> {
    //const options = { relations: relationshipNames };
    const result = await this.enrollmentRepository.findOne({where: {student: id, year: new Date().getFullYear().toString()}});
    this.logger.error(result._id);
    return EnrollmentMapper.fromEntityToDTO(result);
  }
}
