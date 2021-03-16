import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedStratus1615254652411 implements MigrationInterface {
    rh: Reference = {
            name: "Estrato",
            value: "Estrato",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "Estrato01",
            name: "Estrato 1",
            value: "01",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Estrato02",
            name: "Estrato 2",
            value: "02",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Estrato03",
            name: "Estrato 3",
            value: "03",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Estrato04",
            name: "Estrato 4",
            value: "04",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Estrato05",
            name: "Estrato 5",
            value: "05",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Estrato06",
            name: "Estrato 6",
            value: "06",
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