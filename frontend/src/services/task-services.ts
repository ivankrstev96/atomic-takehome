import {API_BASE_URL, axiosApiWrapper} from "../utils/apiUtils.ts";
import type {ApiResponse} from "../types/ApiResponse.ts";
import axios from "axios";
import type {TaskOutputDto} from "../types/TaskOutputDto.ts";
import type {TaskInputDto} from "../types/TaskInputDto.ts";

const TASKS_BASE_URL = `${API_BASE_URL}/tasks`;

export const getTasks = async (): Promise<ApiResponse<Array<TaskOutputDto>>> => {
  return axiosApiWrapper(() =>
    axios.get<Array<TaskOutputDto>>(
      `${TASKS_BASE_URL}`
    )
  );
};

export const getTask = async (
  taskId: number
): Promise<ApiResponse<TaskOutputDto>> => {
  return axiosApiWrapper(() =>
    axios.get<TaskOutputDto>(
      `${TASKS_BASE_URL}/${taskId}`
    )
  );
};

export const createTask = async (
  task: TaskInputDto
): Promise<ApiResponse<TaskOutputDto>> => {
  return axiosApiWrapper(() =>
    axios.post<TaskOutputDto>(
      `${TASKS_BASE_URL}`,
      task
    )
  );
};

export const updateTask = async (
  id: number,
  task: TaskInputDto
): Promise<ApiResponse<TaskOutputDto>> => {
  return axiosApiWrapper(() =>
    axios.put<TaskOutputDto>(
      `${TASKS_BASE_URL}/${id}`,
      task
    )
  );
};

export const deleteTask = async (
  id: number
): Promise<ApiResponse<string>> => {
  return axiosApiWrapper(() =>
    axios.delete<string>(
      `${TASKS_BASE_URL}/${id}`
    )
  );
};

export const toggleTaskCompleted = async (
  id: number
): Promise<ApiResponse<TaskOutputDto>> => {
  return axiosApiWrapper(() =>
    axios.post<TaskOutputDto>(
      `${TASKS_BASE_URL}/${id}/toggle`
    )
  );
};
