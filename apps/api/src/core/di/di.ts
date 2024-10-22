import { ProductsRepository, UsersRepository } from '@marketplace/database';

export const DI = {
  usersRepository: new UsersRepository(),
  productsRepository: new ProductsRepository(),
};
