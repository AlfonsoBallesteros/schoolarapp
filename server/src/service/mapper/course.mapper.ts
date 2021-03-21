import { Course } from '../../domain/course.entity';
import { CourseDTO } from '../dto/course.dto';
import { ObjectID } from 'mongodb';

/**
 * A Course mapper object.
 */
export class CourseMapper {
  static fromDTOtoEntity(entityDTO: CourseDTO): Course {
    if (!entityDTO) {
      return;
    }
    let entity = new Course();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
      entity._id = new ObjectID(entityDTO._id)
    });
    return entity;
  }

  static fromEntityToDTO(entity: Course): CourseDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CourseDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
