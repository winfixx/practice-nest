import { IUser } from 'src/users/interface/user.interface'

export interface IRole {
    id: number
    value: string
    description: string
    users: IUser[]
}