import { type BaseEntity } from './base.entity'

export enum ProductCategory {
  Clothing = 'clothing',
  Food = 'food',
  Electronics = 'electronics',
  Books = 'books',
  Other = 'other'
}

export interface ProductEntity extends BaseEntity {
  userId: string
  title: string
  price: number
  description: string
  category: ProductCategory
}
