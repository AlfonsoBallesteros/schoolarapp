/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

/**
 * A Person DTO object.
 */
export class PersonDTO extends BaseDTO {
    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'surname field', required: false })
    surname: string;

    @ApiModelProperty({ description: 'birthdate field', required: false })
    birthdate: string;

    @ApiModelProperty({ description: 'phoneNumber field', required: false })
    phoneNumber: string;

    @ApiModelProperty({ description: 'district field', required: false })
    district: string;

    @ApiModelProperty({ description: 'neighborhood field', required: false })
    neighborhood: string;

    @ApiModelProperty({ description: 'stratus field', required: false })
    stratus: string;

    @ApiModelProperty({ description: 'address field', required: false })
    address: string;

    @ApiModelProperty({ description: 'rh field', required: false })
    rh: string;

    @ApiModelProperty({ description: 'disease field', required: false })
    disease: boolean;

    @ApiModelProperty({ description: 'disability field', required: false })
    disability: boolean;

    @ApiModelProperty({ description: 'relations field', required: false })
    relations: string;

    @ApiModelProperty({ description: 'stateCivil field', required: false })
    stateCivil: string;

    @ApiModelProperty({ description: 'profession field', required: false })
    profession: string;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
