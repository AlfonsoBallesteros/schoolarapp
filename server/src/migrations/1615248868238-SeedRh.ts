import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedRh1615248868238 implements MigrationInterface {
    rh: Reference = {
            name: "rh",
            value: "rh",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "rh0+",
            name: "O Positivo",
            value: "O+",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "rh0-",
            name: "O Negativo",
            value: "O-",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "rhA+",
            name: "A Positivo",
            value: "A+",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "rhA-",
            name: "A Negativo",
            value: "A-",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "rhAB+",
            name: "AB Positivo",
            value: "AB+",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "rhAB-",
            name: "AB Negativo",
            value: "AB-",
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