import { ApiProperty } from '@nestjs/swagger/dist'
import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
    @ApiProperty({ example: 'test@test.test', description: 'Email' })
    @IsString({ message: 'Должна быть строкой' })
    @IsEmail({}, { message: 'Неккоректный email' })
    readonly email: string

    @ApiProperty({ example: '12345', description: 'Пароль' })
    @IsString({ message: 'Должна быть строкой' })
    @Length(4, 16, { message: 'Не меньше 4 и не больше 16' })
    readonly password: string
}