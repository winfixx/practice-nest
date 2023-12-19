import { Controller, Post, Body, UsePipes } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { ValidationPipe } from 'src/pipe/validation.pipe'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('login')
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto)
    }

    @Post('registration')
    @UsePipes(ValidationPipe)
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto)
    }
}
