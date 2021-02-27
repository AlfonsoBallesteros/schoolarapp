import { Type } from '../../domain/type.entity';
import { TypeDTO } from '../dto/type.dto';

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
