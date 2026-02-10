export type BackendErrorResponse = {
  status: number;
  message: string;
  errors?: Array<{
    field: string,
    message: string
  }>
};