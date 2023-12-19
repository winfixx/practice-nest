import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from '../exception/validation.exception'
import { CreateUserDto } from 'src/users/dto/create-user.dto'

@Injectable()
export class ValidationPipe implements PipeTransform<CreateUserDto> {

    public async transform(value: CreateUserDto, metadata: ArgumentMetadata) {

        if (!metadata.metatype || this.toValidate(metadata.metatype)) {
            throw new HttpException('Нет метатипа параметра запроса', HttpStatus.INTERNAL_SERVER_ERROR)
        }

        const obj = plainToInstance(metadata.metatype, value)
        const errors = await validate(obj)

        if (errors.length) {
            let message = errors.map(error => ({
                [error.property]: Object.values(error.constraints)
            }))

            throw new ValidationException(message)
        }

        return value
    }

    private toValidate(metatype: Function): Boolean {
        const types: Function[] = [String, Number, Array, Object, Boolean]
        return types.includes(metatype)
    }

}
