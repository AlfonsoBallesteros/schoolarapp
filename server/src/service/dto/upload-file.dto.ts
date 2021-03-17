import { ApiModelProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNotEmptyObject, IsNumber, IsNumberString, IsObject, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

/**
 * A DTO representing a UploadFile.
 */
export class UploadFileDto {

    @ApiModelProperty({ description: 'personId relationship', required: true })
    @IsMongoId({ message: "El id person debe ser un MongoId" })
    personId: string;

    @ApiModelProperty({ description: 'matriculaId relationship', required: true })
    @IsMongoId({ message: "El id matricula debe ser MongoId" })
    matriculaId: string;

    @ApiModelProperty({
        isArray: false,
        enum: ["docStudentFile", "docDadFile", "docMomFile", "docTutorFile", "academicFile", "peaceSafeFile"],
        description: 'Data Types - Enum',
        required: true,
    })
    @IsString({ message: "El dataType debe ser un String" })
    @MinLength(4, { message: "El dataType debe ser mayor o igual a $constraint1 caracteres" })
    @MaxLength(20, { message: "El dataType debe ser menor o igual a $constraint1 caracteres" })
    dataType: string;

    @ApiModelProperty({ description: 'filetosave field', required: true })
    filetosave: any;

}
