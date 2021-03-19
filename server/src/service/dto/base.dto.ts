import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

/**
 * A DTO base objct.
 */
export class BaseDTO {

    @IsOptional()
    @IsMongoId({ message: "El id debe ser MongoId" })
    _id?: string;

    @IsOptional()
    @IsString({ message: "El campo 'creado por' debe ser un String" })
    @MinLength(4, { message: "El campo 'creado por' debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(20, { message: "El campo 'creado por' debe ser menor o igual a $constraint1 caracteres" })
    createdBy?: string;

    @IsOptional()
    @IsDateString({}, { message: "La fecha de creacion debe ser un String Date" })
    @IsNotEmpty({ message: "La fecha de creacion no debe estar vacia" })
    createdDate?: Date;

    @IsOptional()
    @IsString({ message: "El campo creado por debe ser un String" })
    @MinLength(4, { message: "El 'campo modificado por ultima vez por' debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(20, { message: "El 'campo modificado por ultima vez por' debe ser menor o igual a $constraint1 caracteres" })
    lastModifiedBy?: string;

    @IsOptional()
    //@IsDateString({ message: "La fecha de ultima modificacion debe ser un String Date" })
    @IsNotEmpty({ message: "La fecha de ultima modificacion no debe estar vacia" })
    lastModifiedDate?: Date;

}
