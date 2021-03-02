import { Enrollment } from '../../domain/enrollment.entity';
import { EnrollmentDTO } from '../dto/enrollment.dto';

/**
 * A Enrollment mapper object.
 */
export class EnrollmentMapper {
  static fromDTOtoEntity(entityDTO: EnrollmentDTO): Enrollment {
    if (!entityDTO) {
      return;
    }
    let entity = new Enrollment();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Enrollment): EnrollmentDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new EnrollmentDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
