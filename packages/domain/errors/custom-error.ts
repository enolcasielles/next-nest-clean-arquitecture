export class CustomError extends Error {
  errors: string[] = [];
  type: string;
  code: number = 500;

  constructor(type: string) {
    super("");
    this.type = type;
    this.setMessage();
  }

  addError(error: string): void {
    this.errors.push(error);
    this.message = this.errors.join("\n");
    this.setMessage();
  }

  setCode(code: number): void {
    this.code = code;
    this.setMessage();
  }

  setMessage() {
    this.message = JSON.stringify({
      type: this.type,
      code: this.code,
      errors: this.errors,
    });
  }

  static fromError(error: Error): CustomError {
    try {
      const params = JSON.parse(error.message);
      const customError = new CustomError(params.type);
      customError.errors = params.errors;
      customError.code = params.code;
      return customError;
    } catch (e) {
      return new CustomError("UNKNOWN_ERROR");
    }
  }
}
