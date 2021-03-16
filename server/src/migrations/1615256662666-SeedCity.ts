import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedCity1615256662666 implements MigrationInterface {
    rh: Reference = {
            name: "Ciudad",
            value: "Ciudad",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "CiudadNeiva",
            name: "Neiva",
            value: "neiva",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadPalermo",
            name: "Palermo",
            value: "palermo",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadRivera",
            name: "Rivera",
            value: "rivera",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadTello",
            name: "Tello",
            value: "tello",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadYaguara",
            name: "Yaguara",
            value: "yaguara",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadVegalarga",
            name: "Vegalarga",
            value: "Vagalarga",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadGigante",
            name: "Gigante",
            value: "gigante",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadGarzon",
            name: "Garzon",
            value: "garzon",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "CiudadPitalito",
            name: "Pitalito",
            value: "pitalito",
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