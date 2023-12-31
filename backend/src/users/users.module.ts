import { Module } from '@nestjs/common'
import { forwardRef } from '@nestjs/common/utils'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { Post } from 'src/posts/posts.model'
import { Role } from 'src/roles/role.model'
import { RolesModule } from 'src/roles/roles.module'
import { UserRoles } from 'src/roles/user-roles.model'
import { UsersController } from './users.controller'
import { User } from './users.model'
import { UsersService } from './users.service'
import { ConfigModule } from 'src/config/config.module'

@Module({
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Post]),
    RolesModule,
    forwardRef(() => AuthModule),
    // ConfigModule.register({})
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
