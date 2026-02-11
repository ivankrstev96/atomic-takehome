import {type AxiosError, type AxiosResponse, isAxiosError} from "axios";
import type {ApiResponse, ApiResponseError} from "../types/ApiResponse.ts";
import type {BackendErrorResponse} from "../types/BackendErrorResponse.ts";

const baseUrlEnv = import.meta.env.BASE_URL;

const BASE_URL = baseUrlEnv.endsWith("/")
  ? baseUrlEnv.substring(0, baseUrlEnv.length - 1)
  : baseUrlEnv;

export const API_BASE_URL = `${BASE_URL}/api/v1`;


export const axiosApiWrapper = async <T>(
  apiCall: () => Promise<AxiosResponse<T>>
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiCall();
    return {
      success: true,
      data: response.data,
    };
  } catch (error: unknown) {
    if (isAxiosError<BackendErrorResponse>(error)) {
      return axiosToApiError(error)
    }

    return {
      success: false,
      message: "Something went wrong!",
      error: {
        kind: "GENERAL",
        message: "Something went wrong!",
      }
    };
  }
};

const axiosToApiError = (axiosError: AxiosError<BackendErrorResponse>): ApiResponseError => {
  switch (axiosError.response?.status) {
    case 400:
      const validationErrors = axiosError.response?.data?.errors;
      return {
        success: false,
        message: axiosError.message || "Validation error!",
        error: {
          kind: "VALIDATION",
          errors: validationErrors?.length ? validationErrors : []
        }
      };
    case 404:
      return {
        success: false,
        message: axiosError.message || "Not found!",
        error: {
          kind: "NOT_FOUND",
          message: axiosError.response?.data?.message || "Not found!",
        }
      };
    case 500:
    default:
      return {
        success: false,
        message: axiosError.message || "Something went wrong!",
        error: {
          kind: "GENERAL",
          message: axiosError.response?.data?.message || "Something went wrong!",
        }
      };
  }
}

