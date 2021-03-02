/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { EnrollmentDTO } from './enrollment.dto';
import { CourseDTO } from './course.dto';
import { TypeDTO } from './type.dto';
import { State } from '../../domain/enumeration/state';

/**
 * A Person DTO object.
 */
export class PersonDTO extends BaseDTO {
  @ApiModelProperty({ description: 'name field', required: false })
  name: string;

  @ApiModelProperty({ description: 'surname field', required: false })
  surname: string;

  @ApiModelProperty({ description: 'documentId field', required: false })
  documentId: string;

  @ApiModelProperty({ description: 'documentExpDate field', required: false })
  documentExpDate: any;

  @ApiModelProperty({ description: 'phoneNumber field', required: false })
  phoneNumber: string;

  @ApiModelProperty({ description: 'telephonNumber field', required: false })
  telephonNumber: string;

  @ApiModelProperty({ description: 'birthdate field', required: false })
  birthdate: any;

  @ApiModelProperty({ description: 'address field', required: false })
  address: string;

  @ApiModelProperty({ description: 'district field', required: false })
  district: string;

  @ApiModelProperty({ description: 'stratus field', required: false })
  stratus: string;

  @ApiModelProperty({ description: 'disease field', required: false })
  disease: boolean;

  @ApiModelProperty({ description: 'disability field', required: false })
  disability: boolean;

  @ApiModelProperty({ description: 'stateCivil field', required: false })
  stateCivil: string;

  @ApiModelProperty({ description: 'ocupation field', required: false })
  ocupation: string;

  @ApiModelProperty({ description: 'parent field', required: false })
  parent: string;

  @ApiModelProperty({ enum: State, description: 'state enum field', required: false })
  state: State;

  @ApiModelProperty({ isArray: true })
  enrollments: any;

  @ApiModelProperty({ isArray: true, })
  courses: any;

  @ApiModelProperty({ description: 'typeId relationship' })
  typeId: string;

  @ApiModelProperty({ description: 'gender relationship' })
  gender: string;

  @ApiModelProperty({ description: 'neighborhood relationship' })
  neighborhood: string;

  @ApiModelProperty({ description: 'city relationship' })
  city: string;

  @ApiModelProperty({ description: 'birthplace relationship' })
  birthplace: string;

  @ApiModelProperty({ description: 'nacionality relationship' })
  nacionality: string;

  @ApiModelProperty({  description: 'cityExp relationship' })
  cityExp: string;

  @ApiModelProperty({ description: 'rh relationship' })
  rh: string;

  @ApiModelProperty({ description: 'eps relationship' })
  eps: string;

  @ApiModelProperty({  description: 'relation relationship' })
  relation: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
