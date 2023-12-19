import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { Role } from './roles/role.model'
import { RolesModule } from './roles/roles.module'
import { UserRoles } from './roles/user-roles.model'
import { User } from './users/users.model'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { Post } from './posts/posts.model'
import { FilesModule } from './files/files.module'
import { resolve } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
      // sync: {alter: true}
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule { }
