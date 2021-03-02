/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { TypeDTO } from './type.dto';
import { PersonDTO } from './person.dto';
import { State } from '../../domain/enumeration/state';

/**
 * A Enrollment DTO object.
 */
export class EnrollmentDTO extends BaseDTO {
  @ApiModelProperty({ description: 'peaceSafeFile field', required: false })
  peaceSafeFile: string;

  @ApiModelProperty({ description: 'academicFile field', required: false })
  academicFile: string;

  @ApiModelProperty({ description: 'docStudentFile field', required: false })
  docStudentFile: string;

  @ApiModelProperty({ description: 'docDadFile field', required: false })
  docDadFile: string;

  @ApiModelProperty({ description: 'docMomFile field', required: false })
  docMomFile: string;

  @ApiModelProperty({ description: 'docTutorFile field', required: false })
  docTutorFile: string;

  @ApiModelProperty({ description: 'academicPeriod field', required: false })
  academicPeriod: string;

  @ApiModelProperty({ description: 'year field', required: false })
  year: string;

  @ApiModelProperty({ description: 'obs field', required: false })
  obs: string;

  @ApiModelProperty({ description: 'workingDay field', required: false })
  workingDay: string;

  @ApiModelProperty({ description: 'enrollModality field', required: false })
  enrollModality: string;

  @ApiModelProperty({ description: 'legacy field', required: false })
  legacy: boolean;

  @ApiModelProperty({ enum: State, description: 'state enum field', required: false })
  state: State;

  @ApiModelProperty({ type: TypeDTO, description: 'workShop relationship' })
  workShop: TypeDTO;

  @ApiModelProperty({ type: TypeDTO, description: 'gradeProx relationship' })
  gradeProx: TypeDTO;

  @ApiModelProperty({ type: PersonDTO, description: 'student relationship' })
  student: PersonDTO;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
