import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedGrade1615256662666 implements MigrationInterface {
    rh: Reference = {
            name: "Grado",
            value: "Grado",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "GradoTransicion",
            name: "Transicion",
            value: "00",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoPrimero",
            name: "Primero",
            value: "01",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoSegundo",
            name: "Segundo",
            value: "02",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoTercero",
            name: "Tercero",
            value: "03",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoCuarto",
            name: "Cuarto",
            value: "04",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoQuinto",
            name: "quinto",
            value: "05",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoSexto",
            name: "Sexto",
            value: "06",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoSeptimo",
            name: "Septimo",
            value: "07",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoOctavo",
            name: "Octavo",
            value: "08",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoNoveno",
            name: "Noveno",
            value: "09",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoDecimo",
            name: "Decimo",
            value: "10",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "GradoUndecimo",
            name: "Undecimo",
            value: "11",
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