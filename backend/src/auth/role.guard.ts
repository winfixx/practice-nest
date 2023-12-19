import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt/dist'
import { Observable } from 'rxjs'
import { ROLES_KEY } from './roles-auth.decorator'
import { User } from 'src/users/users.model'
import { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler())
            if (!requiredRoles) {
                return true
            }

            const ctx = context.switchToHttp()
            const req = ctx.getRequest<Request>()
            const token = req.headers.authorization.split(' ')[1]

            const user = this.jwtService.verify(token)
            return this.includeRole(requiredRoles, user.roles)
        } catch (error) {
            throw new ForbiddenException('Нет доступа')
        }
    }

    private includeRole(requiredRoles: string[], userRoles: User['roles']) {
        return userRoles.some(role => requiredRoles.includes(role.value))
    }
}
