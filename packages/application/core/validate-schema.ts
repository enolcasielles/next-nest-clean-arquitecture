import { CommonErrors, CustomError } from "@domain";
import { type ZodObject, type ZodError } from "zod";

export const validateSchema = (
  schema: ZodObject<any>,
  data: any,
): CustomError => {
  const parsed = schema.safeParse(data);
  if (parsed.success) return null;
  const zodError: ZodError = (parsed as any).error;
  const error = new CustomError(CommonErrors.VALIDATION_ERROR);
  error.setCode(400);
  for (const issue of zodError.issues) {
    if (issue.code === "invalid_type")
      error.addError(`${issue.path}: ${issue.message}`);
    error.addError(issue.message);
  }
  return error;
};
