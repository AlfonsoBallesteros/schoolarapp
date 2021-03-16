import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Reference } from '../domain/reference.entity';
import { State } from '../domain/enumeration/state';
import { Type } from '../domain/type.entity';


export class SeeedTypeDoc1615253975126 implements MigrationInterface {
    rh: Reference = {
            name: "Tipo de Documento",
            value: "T Doc.",
            state: State.ACTIVO,
            types: [
            ]
    };

    type: Type[] = [
        {
            code: "TypeDocCedula",
            name: "Cedula",
            value: "CC",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "TypeDocCedulaExt",
            name: "Cedula de extranjeria",
            value: "CE",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "TypeDocTarjetaIdentidad",
            name: "Tarjeta Identidad",
            value: "TI",
            parent: "",
            state:State.ACTIVO,
            reference: ""
          },
          {
            code: "TypeDocPassport",
            name: "Pasaporte",
            value: "PS",
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