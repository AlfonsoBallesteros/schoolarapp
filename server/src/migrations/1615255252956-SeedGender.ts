import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedGender1615255252956 implements MigrationInterface {
    rh: Reference = {
            name: "Genero",
            value: "Genero",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "GeneroMasculino",
            name: "Masculino",
            value: "M",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GeneroFemenino",
            name: "Femenino",
            value: "F",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GeneroOtro",
            name: "Otro",
            value: "Otro",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GeneroPrefieroNoResponer",
            name: "Prefieron no responder",
            value: "prefieron no responder",
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
        await referenceRepository.update(refrences._id, refrences);;

    }
    public async down(queryRunner: QueryRunner): Promise<any> {}
}