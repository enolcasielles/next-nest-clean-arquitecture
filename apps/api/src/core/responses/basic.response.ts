const SUCCESS_TYPE = 'SUCCESS';

export class BasicResponse {
  statusCode: number;
  success: boolean;
  type: string;
  errors: Array<string>;

  static success(): BasicResponse {
    return {
      statusCode: 200,
      success: true,
      type: SUCCESS_TYPE,
      errors: null,
    };
  }

  static error(
    code: number,
    type: string,
    errors: Array<string>,
  ): BasicResponse {
    return {
      statusCode: code,
      success: false,
      type,
      errors,
    };
  }
}
