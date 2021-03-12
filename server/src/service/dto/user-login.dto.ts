import { ApiModelProperty } from '@nestjs/swagger';

import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsMongoId, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';

/**
 * A DTO representing a login user.
 */
export class UserLoginDTO {
    @ApiModelProperty({ description: 'User password' })
    @IsNotEmpty({ message: "La contraseña no debe estar vacia" })
    @IsString({ message: "La contraseña debe ser un String" })
    @MinLength(4, { message: "El nombre de usuario debe ser mayor o igual a $constraint1 caracteres" })
    readonly password: string;

    @ApiModelProperty({ description: 'User remember login', required: false })
    @IsOptional()
    @IsBoolean({ message: "El rememberMe debe ser Boolean" })
    @IsNotEmpty({ message: "El rememberMe no debe estar vacio" })
    readonly rememberMe?: boolean;

    @ApiModelProperty({ description: 'User login name' })
    @IsString({ message: "El nombre de usuario debe ser un String" })
    @MinLength(4, { message: "El nombre de usuario debe ser mayor o igual a $constraint1 caracteres" })
    readonly username: string;
}
