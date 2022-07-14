import { statusCode } from "./statusCodes";
export class Response {
  public static success(data: any) {
    return {
      success: true,
      statusCode: statusCode.success,
      data: data,
      message: 'Success'
    };
  }
  public static fileNotFound() {
    return {
      success: false,
      statusCode: statusCode.fileNotFound,
      data: null,
      message: 'File not found',
    };
  }
  public static internalServerError() {
    return {
      success: false,
      statusCode: statusCode.internalServerError,
      data: null,
      message: "Internal server error",
    };
  }

  public static badRequest(message: string) {
    return {
      success: false,
      statusCode: statusCode.badRequest,
      data: null,
      message: message,
    };
  };

}