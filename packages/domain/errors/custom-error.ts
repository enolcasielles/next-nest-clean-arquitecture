export class CustomError {
  errors: string[] = [];
  payload: any = {};
  type: string;
  constructor(type: string) {
    this.type = type;
  }

  setPayload(payload: any): void {
    this.payload = payload;
  }

  addError(error: string): void {
    this.errors.push(error);
  }
}
