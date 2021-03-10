/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { PersonDTO } from './person.dto';

import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';


/**
 * A Course DTO object.
 */
export class CourseDTO extends BaseDTO {

  @ApiModelProperty({ description: 'name field', required: false })
  @IsString({ message: "El nombre debe ser un String" })
  @MinLength(4, { message: "El nombre debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El nombre debe ser menor o igual a $constraint1 caracteres" })
  name: string;

  @ApiModelProperty({ description: 'hour field', required: false })
  @IsString({ message: "La hora debe ser un String" })
  @MinLength(4, { message: "La hora debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(10, { message: "La hora debe ser menor o igual a $constraint1 caracteres" })
  hour: string;

  @ApiModelProperty({ description: 'grade field', required: false })
  @IsString({ message: "El grado debe ser un String" })
  @MinLength(4, { message: "El grado debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El grado debe ser menor o igual a $constraint1 caracteres" })
  grade: string;

  @ApiModelProperty({ description: 'teacher relationship', required: false })
  @IsString({ message: "El nombre del profesor debe ser un String" })
  @MinLength(4, { message: "El nombre del profesor debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El nombre del profesor debe ser menor o igual a $constraint1 caracteres" })
  teacher: string;

  @ApiModelProperty({ isArray: true, description: 'students relationship', required: false })
  @IsArray({ message: "El campo estudiantes debe ser un Array" })
  students: any

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
