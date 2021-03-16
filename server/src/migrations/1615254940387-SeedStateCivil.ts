import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedStateCivil1615254940387 implements MigrationInterface {
    rh: Reference = {
            name: "Estado Civil",
            value: "Estado Civil",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "EstadoCivilSoltero",
            name: "Soltero",
            value: "soltero",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "EstadoCivilCasado",
            name: "Casado",
            value: "casado",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "EstadoCivilViudo",
            name: "Viudo",
            value: "viudo",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "EstadoCivilDivorciado",
            name: "Divorciado",
            value: "divorciado",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "EstadoCivilUnionLibre",
            name: "Union libre",
            value: "union libre",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },

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