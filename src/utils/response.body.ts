
export interface IResponseBody {
    error?: String;
    data?: any;
    message?: String;
    statusCode?: number
}
export function responseBody(
    data?: any,
    error?: any,
    message?: String,
    statusCode?: number
): IResponseBody {
    return {
        error: error,
        data: data,
        message: message,
        statusCode: statusCode
    };
}
