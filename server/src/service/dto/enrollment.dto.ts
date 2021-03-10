/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';


import { State } from '../../domain/enumeration/state';

/**
 * A Enrollment DTO object.
 */
export class EnrollmentDTO extends BaseDTO {
  @ApiModelProperty({ description: 'peaceSafeFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL del paz y salvo debe ser un String" })
  @MinLength(20, { message: "La URL del paz y salvo debe ser mayor o igual a $constraint1 caracteres" })
  peaceSafeFile: string;

  @ApiModelProperty({ description: 'academicFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL del boletin academico debe ser un String" })
  @MinLength(20, { message: "La URL boletin academico debe ser mayor o igual a $constraint1 caracteres" })
  academicFile: string;

  @ApiModelProperty({ description: 'docStudentFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL documento del estudiante debe ser un String" })
  @MinLength(20, { message: "La URL documento del estudiante debe ser mayor o igual a $constraint1 caracteres" })
  docStudentFile: string;

  @ApiModelProperty({ description: 'docDadFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL del documento del padre debe ser un String" })
  @MinLength(20, { message: "La URL del documento del padre debe ser mayor o igual a $constraint1 caracteres" })
  docDadFile: string;

  @ApiModelProperty({ description: 'docMomFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL del documento de la madre debe ser un String" })
  @MinLength(20, { message: "La URL del documento de la madre debe ser mayor o igual a $constraint1 caracteres" })
  docMomFile: string;

  @ApiModelProperty({ description: 'docTutorFile field', required: false })
  @IsOptional()
  @IsString({ message: "La URL del documento del acudiente debe ser un String" })
  @MinLength(20, { message: "La URL del documento del acudiente debe ser mayor o igual a $constraint1 caracteres" })
  docTutorFile: string;

  @ApiModelProperty({ description: 'academicPeriod field', required: false })
  @IsString({ message: "El periodo academico debe ser un String" })
  @MinLength(4, { message: "El periodo academico debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El periodo academico debe ser menor o igual a $constraint1 caracteres" })
  academicPeriod: string;

  @ApiModelProperty({ description: 'year field', required: false })
  @IsNumberString({ no_symbols: true }, { message: "El año no es un string numerico" })
  @IsNotEmpty({ message: "El año no debe estar vacio" })
  @MinLength(4, { message: "El año debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(4, { message: "El año debe ser menor o igual a $constraint1 caracteres" })
  year: string;

  @ApiModelProperty({ description: 'obs field', required: false })
  @IsString({ message: "El obs debe ser un String" })
  @MinLength(4, { message: "El obs debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El obs debe ser menor o igual a $constraint1 caracteres" })
  obs: string;

  @ApiModelProperty({ description: 'workingDay field', required: false })
  @IsString({ message: "El workingDay debe ser un String" })
  @MinLength(4, { message: "El workingDay debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El workingDay debe ser menor o igual a $constraint1 caracteres" })
  workingDay: string;

  @ApiModelProperty({ description: 'enrollModality field', required: false })
  @IsString({ message: "El enrollModality debe ser un String" })
  @MinLength(4, { message: "El enrollModality debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El enrollModality debe ser menor o igual a $constraint1 caracteres" })
  enrollModality: string;

  @ApiModelProperty({ description: 'legacy field', required: false })
  @IsBoolean({ message: "El legacy field debe ser Boolean" })
  @IsNotEmpty({ message: "El legacy field no debe estar vacio" })
  legacy: boolean;

  @ApiModelProperty({ enum: State, description: 'state enum field', required: false })
  @IsNotEmpty({ message: "El estado no debe estar vacio" })
  state: State;

  @ApiModelProperty({ description: 'workShop relationship', required: false })
  @IsString({ message: "El workShop debe ser un String" })
  @MinLength(4, { message: "El workShop debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El workShop debe ser menor o igual a $constraint1 caracteres" })
  workShop: string;

  @ApiModelProperty({ description: 'gradeProx relationship', required: false })
  @IsString({ message: "El gradeProx debe ser un String" })
  @MinLength(4, { message: "El gradeProx debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El gradeProx debe ser menor o igual a $constraint1 caracteres" })
  gradeProx: string;

  @ApiModelProperty({ description: 'student relationship', required: false })
  @IsMongoId({ message: "El id de estudiante debe ser MongoId" })
  student: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
