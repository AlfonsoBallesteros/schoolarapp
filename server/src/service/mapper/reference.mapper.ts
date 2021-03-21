import { Reference } from '../../domain/reference.entity';
import { ReferenceDTO } from '../dto/reference.dto';
import { ObjectID } from 'mongodb';

/**
 * A Reference mapper object.
 */
export class ReferenceMapper {
  static fromDTOtoEntity(entityDTO: ReferenceDTO): Reference {
    if (!entityDTO) {
      return;
    }
    let entity = new Reference();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
      entity._id = new ObjectID(entityDTO._id)
    });
    return entity;
  }

  static fromEntityToDTO(entity: Reference): ReferenceDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ReferenceDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
