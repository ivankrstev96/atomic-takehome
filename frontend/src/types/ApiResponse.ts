export interface ApiResponseSuccess<T> {
  success: true;
  data: T;
}

export interface ApiResponseError {
  success: false;
  message: string;
  error: ApiError
}

export type ApiError = GeneralError | ValidationError | NotFoundError;

interface GeneralError {
  kind: "GENERAL";
  message: string;
}

interface ValidationError {
  kind: "VALIDATION"
  errors: Array<{
    message: string;
    field: string;
  }>
}

interface NotFoundError {
  kind: "NOT_FOUND"
  message: string;
}

export type ApiResponse<T> = ApiResponseSuccess<T> | ApiResponseError;