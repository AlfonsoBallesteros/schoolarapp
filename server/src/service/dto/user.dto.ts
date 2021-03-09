import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsEmail, IsInt, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, MaxLength, Min, MinLength, ValidateNested } from 'class-validator';
import { BaseDTO } from './base.dto';
/**
 * An User DTO object.
 */
export class UserDTO extends BaseDTO {
    @ApiModelProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    login: string;

    @ApiModelProperty({ example: 'MyUser', description: 'User first name', required: false })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    firstName?: string;

    @ApiModelProperty({ example: 'MyUser', description: 'User last name', required: false })
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    lastName?: string;

    @ApiModelProperty({ example: 'myuser@localhost.it', description: 'User email' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiModelProperty({ example: 'true', description: 'User activation', required: false })
    @IsBoolean()
    @IsNotEmpty()
    activated?: boolean;

    @ApiModelProperty({ example: 'en', description: 'User language', required: false })
    @IsString()
    @MinLength(2)
    @MaxLength(2)
    langKey?: string;

    @ApiModelProperty({
        isArray: true,
        enum: ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ANONYMOUS'],
        description: 'Array of permissions',
        required: false,
    })
    authorities?: any[];

    @ApiModelProperty({ example: 'myuser', description: 'User password' })
    password: string;

    @ApiModelProperty({ example: 'http://my-image-url', description: 'Image url', required: false })
    imageUrl?: string;

    activationKey?: string;

    resetKey?: string;

    resetDate?: Date;

    @ApiModelProperty({ description: 'person relationship', required: true })
    person: string;
}
