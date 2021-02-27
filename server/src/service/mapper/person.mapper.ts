import { Person } from '../../domain/person.entity';
import { PersonDTO } from '../dto/person.dto';

/**
 * A Person mapper object.
 */
export class PersonMapper {
    static fromDTOtoEntity(entityDTO: PersonDTO): Person {
        if (!entityDTO) {
            return;
        }
        const entity = new Person();
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
        const entityDTO = new PersonDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
