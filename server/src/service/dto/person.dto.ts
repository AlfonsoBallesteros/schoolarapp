/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApiModelProperty } from '@nestjs/swagger';
import { BaseDTO } from './base.dto';

import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

import { EnrollmentDTO } from './enrollment.dto';
import { CourseDTO } from './course.dto';
import { TypeDTO } from './type.dto';
import { State } from '../../domain/enumeration/state';



/**
 * A Person DTO object.
 */
export class PersonDTO extends BaseDTO {
  @ApiModelProperty({ description: 'name field', required: false })
  @IsString({ message: "El nombre debe ser un String" })
  @MinLength(4, { message: "El nombre debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El nombre debe ser menor o igual a $constraint1 caracteres" })
  name: string;

  @ApiModelProperty({ description: 'surname field', required: false })
  @IsString({ message: "El apellido debe ser un String" })
  @MinLength(4, { message: "El apellido debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El apellido debe ser menor o igual a $constraint1 caracteres" })
  surname: string;

  @ApiModelProperty({ description: 'typeId relationship', required: false })
  @IsMongoId({ message: "El tipo de documento debe ser MongoId" })
  typeId: string;

  @ApiModelProperty({ description: 'documentId field', required: false })
  @IsNumberString({ no_symbols: true }, { message: "El numero de documento no es un string numerico" })
  @IsNotEmpty({ message: "El numero de documento no debe estar vacio" })
  @MinLength(7, { message: "El numero de documento debe ser menor o igual a $constraint1 caracteres" })
  documentId: string;

  @ApiModelProperty({ type: Date, description: 'documentExpDate field', required: false })
  @IsOptional()
  documentExpDate: Date;

  @ApiModelProperty({ description: 'cityExp relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "La ciudad de expedicion del documento debe ser MongoId" })
  @IsOptional()
  cityExp: string;

  @ApiModelProperty({ type: Date, description: 'birthdate field', required: false })
  @IsDateString({}, { message: "La fecha de nacimiento debe ser un String Date" })
  @IsNotEmpty({ message: "La fecha de nacimiento no debe estar vacia" })
  @IsOptional()
  birthdate: Date;

  @ApiModelProperty({ description: 'birthplace relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "La ciudad de nacimiento debe ser MongoId" })
  birthplace: string;

  @ApiModelProperty({ description: 'phoneNumber field', required: false })
  @IsNumberString({ no_symbols: true }, { message: "El numero de telefono movil no es un string numerico" })
  @IsNotEmpty({ message: "La numero de telefono movil no debe estar vacio" })
  @MinLength(7)
  @IsOptional()
  phoneNumber: string;

  @ApiModelProperty({ description: 'telephonNumber field', required: false })
  @IsNumberString({ no_symbols: true }, { message: "El numero de telefono fijo no es un string numerico" })
  @IsNotEmpty({ message: "El numero de telefono fijo no debe estar vacio" })
  @MinLength(7)
  @IsOptional()
  telephonNumber: string;

  @ApiModelProperty({ description: 'city relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "La ciudad de residencia debe ser MongoId" })
  @IsOptional()
  city: string;

  @ApiModelProperty({ description: 'nacionality relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "La nacionalidad debe ser MongoId" })
  @IsOptional()
  nacionality: string;

  @ApiModelProperty({ description: 'neighborhood relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "El barrio debe ser MongoId" })
  @IsOptional()
  neighborhood: string;

  @ApiModelProperty({ description: 'address field', required: false })
  @IsString({ message: "La direccion de residencia debe ser un String" })
  @MinLength(4, { message: "La direccion de residencia debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "La direccion de residencia debe ser menor o igual a $constraint1 caracteres" })
  @IsOptional()
  address: string;

  @ApiModelProperty({ description: 'district field', required: false })
  @IsString({ message: "La comuna debe ser un String" })
  @MinLength(4, { message: "La comuna debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "La comuna debe ser menor o igual a $constraint1 caracteres" })
  @IsOptional()
  district: string;

  @ApiModelProperty({ description: 'stratus field', required: false })
  @IsString({ message: "El estrato debe ser un String" })
  @MinLength(4, { message: "El estrato debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El estrato debe ser menor o igual a $constraint1 caracteres" })
  @IsOptional()
  stratus: string;

  @ApiModelProperty({ description: 'gender relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "El genero debe ser MongoId" })
  @IsOptional()
  gender: string;

  @ApiModelProperty({ description: 'rh relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "El rh debe ser MongoId" })
  @IsOptional()
  rh: string;

  @ApiModelProperty({ description: 'eps relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "La EPS debe ser MongoId" })
  @IsOptional()
  eps: string;

  @ApiModelProperty({ description: 'disease field', required: false })
  @IsBoolean({ message: "El campo enfermedad debe ser Boolean" })
  @IsNotEmpty({ message: "El campo enfermedad no debe estar vacio" })
  @IsOptional()
  disease: boolean;

  @ApiModelProperty({ description: 'disability field', required: false })
  @IsBoolean({ message: "El campo invalidez debe ser Boolean" })
  @IsNotEmpty({ message: "El campo invalidez no debe estar vacio" })
  @IsOptional()
  disability: boolean;




  @ApiModelProperty({ isArray: true, required: false })
  @IsOptional()
  @IsArray({ message: "El campo matriculas debe ser un Array" })
  enrollments: any;

  @ApiModelProperty({ isArray: true, required: false })
  @IsOptional()
  @IsArray({ message: "El campo cursos debe ser un Array" })
  courses: any;




  @ApiModelProperty({ description: 'stateCivil field', required: false })
  @IsOptional()
  @IsString({ message: "El estado civil debe ser un String" })
  @MinLength(4, { message: "El estado civil debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "El estado civil debe ser menor o igual a $constraint1 caracteres" })
  stateCivil: string;

  @ApiModelProperty({ description: 'ocupation field', required: false })
  @IsOptional()
  @IsString({ message: "La ocupacion de la persona debe ser un String" })
  @MinLength(4, { message: "La ocupacion de la persona debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(20, { message: "La ocupacion de la persona debe ser menor o igual a $constraint1 caracteres" })
  ocupation: string;

  @ApiModelProperty({ description: 'relation relationship', required: false })
  @IsOptional()
  @IsMongoId({ message: "El parentesco debe ser MongoId" })
  relation: string;

  @ApiModelProperty({ description: 'parent field', required: false })
  @IsOptional()
  @IsString({ message: "El campo padres debe ser un String" })
  @MinLength(4, { message: "El campo padres debe ser mayor o igual a $constraint1 caracteres" })
  @MaxLength(50, { message: "El campo padres debe ser menor o igual a $constraint1 caracteres" })
  parent: string;




  @ApiModelProperty({ enum: State, description: 'state enum field', required: false })
  @IsOptional()
  @IsNotEmpty({ message: "El estado no debe estar vacio" })
  state: State;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
