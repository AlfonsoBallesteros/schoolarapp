import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { BaseDTO } from './base.dto';
/**
 * An User DTO object.
 */
export class UpdateUserDto extends BaseDTO {
    @ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
    @IsString({ message: "El nombre de usuario debe ser un String" })
    @MinLength(4, { message: "El nombre de usuario debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(80, { message: "El nombre de usuario debe ser menor o igual a $constraint1 caracteres" })
    login: string;

    @ApiModelProperty({ example: 'MyUser', description: 'User first name', required: false })
    @IsOptional()
    @IsString({ message: "El nombre debe ser un String" })
    @MinLength(4, { message: "El nombre debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(20, { message: "El nombre debe ser menor o igual a $constraint1 caracteres" })
    firstName?: string;

    @ApiModelProperty({ example: 'MyUser', description: 'User last name', required: false })
    @IsOptional()
    @IsString({ message: "El apellido debe ser un String" })
    @MinLength(4, { message: "El apellido debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(20, { message: "El apellido debe ser menor o igual a $constraint1 caracteres" })
    lastName?: string;


    @ApiModelProperty({ example: 'true', description: 'User activation', required: false })
    @IsOptional()
    @IsBoolean({ message: "El activated debe ser Boolean" })
    @IsNotEmpty({ message: "El activated no debe estar vacio" })
    activated?: boolean;

    @ApiModelProperty({ example: 'en', description: 'User language', required: false })
    @IsOptional()
    @IsString({ message: "El idioma debe ser un String" })
    @MinLength(2, { message: "El idioma debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(2, { message: "El idioma debe ser menor o igual a $constraint1 caracteres" })
    langKey?: string;

    @ApiModelProperty({
        isArray: true,
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'],
        description: 'Array of permissions',
        required: false,
    })
    @IsOptional()
    @IsArray({ message: "El rol debe ser un Array" })
    @IsString({ each: true, message: "El campo del array de roles debe ser un String" })
    authorities?: any[];

    @ApiModelProperty({ example: 'myuser', description: 'User password' })
    @IsOptional()
    @IsString({ message: "La contraseña debe ser un String" })
    @MinLength(8, { message: "La contraseña debe ser mayor o igual a $constraint1 caracteres" })
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}$/, { message: 'La contraseña es demasiado debil' })
    password: string;

    @ApiModelProperty({ example: 'http://my-image-url', description: 'Image url', required: false })
    @IsOptional()
    @IsString({ message: "La URL de la imagen del usuario debe ser un String" })
    @MinLength(20, { message: "La URL de la imagen del usuario debe ser mayor o igual a $constraint1 caracteres" })
    imageUrl?: string;

    @IsOptional()
    @IsString({ message: "La llave de activacion debe ser un String" })
    @MinLength(4, { message: "La llave de activacion debe ser mayor o igual a $constraint1 caracteres" })
    activationKey?: string;

    @IsOptional()
    @IsString({ message: "La llave de reinicio debe ser un String" })
    @MinLength(4, { message: "La llave de reinicio debe ser mayor o igual a $constraint1 caracteres" })
    resetKey?: string;

    @IsOptional()
    //@IsDateString({ message: "La fecha de reinicio debe ser un String Date" })
    @IsNotEmpty({ message: "La fecha de reinicio no debe estar vacia" })
    resetDate?: Date;

    @ApiModelProperty({ description: 'person relationship', required: true })
    @IsOptional()
    @IsMongoId({ message: "El id de persona debe ser MongoId" })
    person: string;
}
