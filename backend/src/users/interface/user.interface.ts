import { IPost } from 'src/posts/interface/post.interface'
import { Post } from 'src/posts/posts.model'
import { IRole } from 'src/roles/interface/role.interface'

export interface IUser {
    id: number
    email: string
    password: string
    banned: boolean
    banReason: string
    roles?: IRole[]
    posts?: IPost[]
}