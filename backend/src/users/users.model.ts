import { ApiProperty } from '@nestjs/swagger/dist'
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { Post } from 'src/posts/posts.model'
import { Role } from 'src/roles/role.model'
import { UserRoles } from 'src/roles/user-roles.model'

export interface UserCreationAttrs {
    email: string
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number

    @ApiProperty({ example: 'test@test.test', description: 'Email' })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    email: string

    @ApiProperty({ example: '12345', description: 'Пароль' })
    @Column({ type: DataType.STRING, allowNull: false })
    password: string

    @ApiProperty({ example: 'false', description: 'Забанен или нет' })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean

    @ApiProperty({ example: 'Просто так', description: 'Описание бана' })
    @Column({ type: DataType.STRING, allowNull: true })
    banReason: string

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}