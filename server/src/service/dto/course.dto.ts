/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { PersonDTO } from './person.dto';

/**
 * A Course DTO object.
 */
export class CourseDTO extends BaseDTO {
  @ApiModelProperty({ description: 'name field', required: false })
  name: string;

  @ApiModelProperty({ description: 'hour field', required: false })
  hour: string;

  @ApiModelProperty({ description: 'grade field', required: false })
  grade: string;

  @ApiModelProperty({ type: PersonDTO, description: 'teacher relationship' })
  teacher: PersonDTO;

  @ApiModelProperty({ type: PersonDTO, isArray: true, description: 'students relationship' })
  students: PersonDTO[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
