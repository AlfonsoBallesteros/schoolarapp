import { Person } from '../../domain/person.entity';
import { PersonDTO } from '../dto/person.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';

/**
 * A Person mapper object.
 */
export class PersonMapper {
  static fromDTOtoEntity(entityDTO: PersonDTO | UpdatePersonDto): Person {
    if (!entityDTO) {
      return;
    }
    let entity = new Person();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Person): PersonDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new PersonDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
