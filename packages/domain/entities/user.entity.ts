import { type BaseEntity } from './base.entity'

export interface UserEntity extends BaseEntity {
  email: string
  password: string
  name: string
}