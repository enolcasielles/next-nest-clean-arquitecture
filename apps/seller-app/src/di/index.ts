import { ProductsRepository, UsersRepository } from '@database'

export const DI = {
  usersRepository: new UsersRepository(),
  productsRepository: new ProductsRepository()
}
