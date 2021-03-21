import { Type } from '../../domain/type.entity';
import { TypeDTO } from '../dto/type.dto';
import { ObjectID } from 'mongodb';

/**
 * A Type mapper object.
 */
export class TypeMapper {
  static fromDTOtoEntity(entityDTO: TypeDTO): Type {
    if (!entityDTO) {
      return;
    }
    let entity = new Type();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
      entity._id = new ObjectID(entityDTO._id)
    });
    return entity;
  }

  static fromEntityToDTO(entity: Type): TypeDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new TypeDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
