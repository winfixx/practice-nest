export type roleName = 'ADMIN' | 'USER'

export class CreateRoleDto {
    readonly value: roleName
    readonly description: string
}
