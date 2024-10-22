import { CustomError } from "./custom-error";

export enum CommonErrors {
  GENERIC_ERROR = "GENERIC_ERROR",
  PRODUCT_NOT_FOUND = "PRODUCT_NOT_FOUND",
  USER_NOT_FOUND = "USER_NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

/**
 * TODO(enol): Los mensajes de error deberían ser generados a partir de un sistema de internacionalización.
 */
enum CommonErrorsMessages {
  GENERIC_ERROR = "Ha ocurrido un error inesperado",
  PRODUCT_NOT_FOUND = "Producto no encontrado",
  USER_NOT_FOUND = "Usuario no encontrado",
  UNAUTHORIZED = "No autorizado",
  VALIDATION_ERROR = "Error de validación",
}

export const buildCommonError = (error: CommonErrors, code?: number) => {
  const customError = new CustomError(error);
  customError.addError(CommonErrorsMessages[error]);
  if (code) customError.setCode(code);
  return customError;
};
