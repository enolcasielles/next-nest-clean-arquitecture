import { CommonErrors, CustomError, buildCommonError } from "@marketplace/domain";

export default async function handleActionsError(action: any) {
  try {
    return await action();
  } catch (e) {
    if (e instanceof CustomError) {
      throw e;
    }
    console.error(e);
    throw buildCommonError(CommonErrors.GENERIC_ERROR);
  }
}
