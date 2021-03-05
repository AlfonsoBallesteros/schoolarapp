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

  @ApiModelProperty({ description: 'teacher relationship', required: false })
  teacher: string;

  @ApiModelProperty({ isArray: true, description: 'students relationship', required: false })
  students: any

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
