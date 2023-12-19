import { Body, Controller, Get, Post } from '@nestjs/common'
import { UseGuards, UsePipes } from '@nestjs/common/decorators'
import { ApiOperation } from '@nestjs/swagger'
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist'
import { RolesGuard } from 'src/auth/role.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { UsersService } from './users.service'
import { ValidationPipe } from 'src/pipe/validation.pipe'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
    constructor(
        private usersService: UsersService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: User })
    @UsePipes(ValidationPipe)
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

    @Get()
    @ApiOperation({ summary: 'Создание пользователя' })
    @ApiResponse({ status: 200, type: [User] })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers()
    }

    @Post('role')
    @ApiOperation({ summary: 'Выдать роль' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto)
    }

    @Post('ban')
    @ApiOperation({ summary: 'Забанить пользователя' })
    @ApiResponse({ status: 200 })
    @Roles('ADMIN')
    @UseGuards(JwtAuthGuard, RolesGuard)
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto)
    }
}
