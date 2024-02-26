import { z } from 'zod'
import { type IProductsRepository, type CreateProductRequest, type ProductEntity, type Either, makeLeft, makeRight, CustomError, ProductCategory } from '@domain'
import { type UseCase } from '../core/usecase'
import { validateSchema } from '../core/validate-schema'

interface Context {
  productsRepository: IProductsRepository
}

interface Request {
  userId: string
  product: CreateProductRequest
}

export class CreateProductUseCase implements UseCase<Request, Context, ProductEntity> {
  async execute (context: Context, request: Request): Promise<Either<CustomError, ProductEntity>> {
    try {
      const validationError = this.validate(request.product)
      if (validationError !== null) {
        return makeLeft(validationError)
      }
      const product = await context.productsRepository.create(request.userId, request.product)
      return makeRight(product)
    } catch (error) {
      if (error instanceof CustomError) {
        return makeLeft(error)
      }
      const genericError = new CustomError('GENERIC_ERROR')
      genericError.setPayload(error)
      return makeLeft(genericError)
    }
  }

  private validate (product: CreateProductRequest): CustomError {
    const schema = z.object({
      title: z.string(),
      price: z.number(),
      description: z.string(),
      category: z.nativeEnum(ProductCategory)
    })
    return validateSchema(schema, product)
  }
}
