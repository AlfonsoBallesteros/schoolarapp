/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { State } from '../../domain/enumeration/state';

/**
 * A Type DTO object.
 */
export class TypeDTO extends BaseDTO {
    @ApiModelProperty({ description: 'code field', required: false })
    code: string;

    @ApiModelProperty({ description: 'name field', required: false })
    name: string;

    @ApiModelProperty({ description: 'value field', required: false })
    value: string;

    @ApiModelProperty({ enum: State, description: 'state enum field', required: false })
    state: State;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
