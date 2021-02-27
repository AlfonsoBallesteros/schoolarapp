import { Reference } from '../../domain/reference.entity';
import { ReferenceDTO } from '../dto/reference.dto';

/**
 * A Reference mapper object.
 */
export class ReferenceMapper {
    static fromDTOtoEntity(entityDTO: ReferenceDTO): Reference {
        if (!entityDTO) {
            return;
        }
        const entity = new Reference();
        const fields = Object.getOwnPropertyNames(entityDTO);
        fields.forEach(field => {
            entity[field] = entityDTO[field];
        });
        return entity;
    }

    static fromEntityToDTO(entity: Reference): ReferenceDTO {
        if (!entity) {
            return;
        }
        const entityDTO = new ReferenceDTO();

        const fields = Object.getOwnPropertyNames(entity);

        fields.forEach(field => {
            entityDTO[field] = entity[field];
        });

        return entityDTO;
    }
}
