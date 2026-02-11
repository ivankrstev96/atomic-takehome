import {Button, Card, Group, Loader} from "@mantine/core";
import {ErrorComponent} from "../components/ErrorComponent.tsx";
import {useEffect, useState} from "react";
import type {TaskOutputDto} from "../types/TaskOutputDto.ts";
import {createTask, getTask, updateTask} from "../services/task-services.ts";
import type {ApiResponse, ApiResponseError} from "../types/ApiResponse.ts";
import {useRouter} from "@tanstack/react-router";
import {TaskForm} from "../components/TaskForm.tsx";
import type {TaskInputDto} from "../types/TaskInputDto.ts";

interface Props {
  taskId?: number
}

export function Task(props: Props) {
  const {taskId} = props;

  const addNewMode = props.taskId === undefined;

  const [task, setTask] = useState<TaskOutputDto | undefined>();
  const [editable, setEditable] = useState<boolean>(addNewMode);
  const [loading, setLoading] = useState<boolean>(!addNewMode);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<ApiResponseError | undefined>();

  const router = useRouter()

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId === undefined) {
        return;
      }

      setLoading(true);

      const response = await getTask(taskId);

      if (response.success) {
        setTask(response.data);
      } else {
        setError(response);
      }
      setLoading(false);
    }

    void fetchTask();
  }, [taskId]);

  const handleSubmit = async (taskInput: TaskInputDto) => {
    setSubmitting(true);

    let response: ApiResponse<TaskOutputDto>;
    if (addNewMode) {
      response = await createTask(taskInput);
    } else {
      response = await updateTask(taskId!, taskInput);
    }

    if (response.success) {
      if (addNewMode) {
        router.navigate({to: "/tasks/$taskId", params: {taskId: response.data.id.toString()}})
        return;
      }
      setTask(response.data);
    } else {
      setError(response);
    }
    setSubmitting(false);
    setEditable(false)
  }

  const renderEditButton = () => {
    if (addNewMode || editable) {
      return;
    }

    return <Button
      variant="outline"
      onClick={() => setEditable(true)}
    >
      Edit
    </Button>
  }

  if (loading) {
    return <Loader />
  }

  return <>
    <Group justify="space-between" align="center">
      <h3>{task ? task.title : "New Task"}</h3>
      <Group>
        {renderEditButton()}
        <Button
          variant="outline"
          color="gray"
          onClick={() => router.navigate({to: "/tasks"})}
        >
          Back
        </Button>
      </Group>
    </Group>
    <Card withBorder>
      <ErrorComponent error={error} clearError={() => setError(undefined)} />
      <TaskForm
        onSubmit={handleSubmit}
        viewOnly={!editable}
        submitting={submitting}
        task={task}
      />
    </Card>
  </>
}
