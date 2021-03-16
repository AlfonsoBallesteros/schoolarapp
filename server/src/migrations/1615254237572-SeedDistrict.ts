import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedDistrict1615254237572 implements MigrationInterface {
    rh: Reference = {
            name: "Comuna",
            value: "Comuna",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "Comuna01",
            name: "Comuna 1",
            value: "01",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna02",
            name: "Comuna 2",
            value: "02",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna03",
            name: "Comuna 3",
            value: "03",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna04",
            name: "Comuna 4",
            value: "04",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna05",
            name: "Comuna 5",
            value: "05",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna06",
            name: "Comuna 6",
            value: "06",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna07",
            name: "Comuna 7",
            value: "07",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna08",
            name: "Comuna 8",
            value: "08",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna08",
            name: "Comuna 8",
            value: "08",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna10",
            name: "Comuna 10",
            value: "10",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna11",
            name: "Comuna 11",
            value: "11",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna12",
            name: "Comuna 12",
            value: "12",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna12+1",
            name: "Comuna 12+1",
            value: "12+1",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "Comuna14",
            name: "Comuna 14",
            value: "14",
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