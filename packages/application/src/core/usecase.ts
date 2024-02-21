import { type CustomError, type Either } from '@marketplace/domain'

export interface UseCase<TRequest, TContext, TResponse> {
  execute: (context: TContext, request: TRequest) => Promise<Either<CustomError, TResponse>>
}
