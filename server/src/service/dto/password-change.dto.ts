import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';

/**
 * A DTO representing a password change required data - current and new password.
 */
export class PasswordChangeDTO {
    @ApiModelProperty({ description: 'Current password' })
    @IsString({ message: "La contraseña actual debe ser un String" })
    @IsNotEmpty({ message: "La contraseña actual no debe estar vacia" })
    readonly currentPassword: string;

    @ApiModelProperty({ description: 'New password' })
    @IsString({ message: "La contraseña nueva debe ser un String" })
    @IsNotEmpty({ message: "La contraseña nueva no debe estar vacia" })
    @MinLength(8, { message: "La contraseña nueva debe ser mayor o igual a $constraint1 caracteres" })
    @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]){8,}$/, { message: 'La contraseña nueva es demasiado debil' })
    readonly newPassword: string;
}
