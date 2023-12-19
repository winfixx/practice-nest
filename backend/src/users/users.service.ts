import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User } from './users.model'
import { Role } from 'src/roles/role.model'
import { AddRoleDto } from './dto/add-role.dto'
import { BanUserDto } from './dto/ban-user.dto'

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User) private userRepository: typeof User,
        private roleService: RolesService
    ) { }

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.userRepository.create(dto)
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles', role.id)
        return user
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.findAll<User>({
            include: { all: true },
        })
        return users
    }

    async getUserByEmail(email: CreateUserDto['email']): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                email
            },
            include: Role
        })

        return user
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        const role = await this.roleService.getRoleByValue(dto.value)

        if (user && role) {
            await user.$add('roles', role.id)
            return dto
        }

        throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND)
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId)
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
        }

        user.banned = true
        user.banReason = dto.banReason
        await user.save()

        return dto
    }
}
