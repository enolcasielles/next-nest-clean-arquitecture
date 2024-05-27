import { CommonErrors, CustomError, buildCommonError } from "@domain";

export const getDataOrError = async <T>(
  fetcher: Promise<any>,
): Promise<T | CustomError> => {
  try {
    const data = await fetcher;
    return data as T;
  } catch (error) {
    if (error instanceof CustomError) return error;
    return buildCommonError(CommonErrors.GENERIC_ERROR);
  }
};
