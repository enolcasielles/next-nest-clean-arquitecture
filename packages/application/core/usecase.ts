import { type CustomError, type Either } from '@domain'

export interface UseCase<TRequest, TContext, TResponse> {
  execute: (context: TContext, request: TRequest) => Promise<Either<CustomError, TResponse>>
}
