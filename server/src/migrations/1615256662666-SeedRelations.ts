import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedRelations1615256662666 implements MigrationInterface {
    rh: Reference = {
            name: "Relaciones",
            value: "Relaciones",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "RelacionesPadre",
            name: "Padre",
            value: "padre",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Relaciones",
            name: "Madre",
            value: "madre",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Relaciones",
            name: "Acudiante",
            value: "acudiente",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          }

    ]
    public async up(queryRunner: QueryRunner): Promise<any> {
        const referenceRepository = getRepository('reference');
        const typeRepository = getRepository('type');
        const refrences = await referenceRepository.save(this.rh);

        this.type.forEach(t => {
          t.reference = refrences._id
        });
        await typeRepository.save(this.type);
        refrences.types = this.type;
        await referenceRepository.update(refrences._id, refrences);

    }
    public async down(queryRunner: QueryRunner): Promise<any> {}
}