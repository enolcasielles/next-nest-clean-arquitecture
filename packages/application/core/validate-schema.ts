import { CustomError } from "@domain";
import { type ZodObject, type ZodError } from "zod";

export const validateSchema = (
  schema: ZodObject<any>,
  data: any,
): CustomError => {
  const parsed = schema.safeParse(data);
  if (parsed.success) return null;
  const zodError: ZodError = (parsed as any).error;
  const error = new CustomError("VALIDATION_ERROR");
  error.setPayload(zodError);
  for (const issue of zodError.issues) {
    error.addError(issue.message);
  }
  return error;
};
