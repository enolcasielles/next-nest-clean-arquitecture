import {
  CommonErrors,
  CustomError,
  buildCommonError,
} from "@marketplace/domain";

export abstract class UseCase<TRequest, TContext, TResponse> {
  constructor(protected context: TContext) {}

  protected abstract run(request: TRequest): Promise<TResponse>;
  protected abstract validate(data: TRequest): CustomError;

  async execute(request: TRequest): Promise<TResponse> {
    try {
      const validateError = this.validate(request);
      if (validateError) throw validateError;
      return await this.run(request);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw buildCommonError(CommonErrors.GENERIC_ERROR);
    }
  }
}
