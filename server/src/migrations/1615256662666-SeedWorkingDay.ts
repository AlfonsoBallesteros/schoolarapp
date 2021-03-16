import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedWorkingDay1615256662666 implements MigrationInterface {
    rh: Reference = {
            name: "Jornada",
            value: "Jornada",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "JornadaMañana",
            name: "Mañana",
            value: "mañana",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "JornadaTarde",
            name: "Tarde",
            value: "tarde",
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