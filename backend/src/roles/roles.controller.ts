import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common'
import { CreateRoleDto, roleName } from './dto/create-role.dto'
import { RolesService } from './roles.service'

@Controller('roles')
export class RolesController {

    constructor(
        private roleService: RolesService
    ) { }

    @Post()
    createRole(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto)
    }

    @Get('/:value')
    getRoleByValue(@Param('value') value: roleName) {
        return this.roleService.getRoleByValue(value)
    }
}
