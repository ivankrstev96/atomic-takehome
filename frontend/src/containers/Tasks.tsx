import {TasksTable} from "../components/TasksTable.tsx";
import {Button, Card, Group, LoadingOverlay} from "@mantine/core";
import {useEffect, useState} from "react";
import {deleteTask, getTasks, toggleTaskCompleted} from "../services/task-services.ts";
import type {TaskOutputDto} from "../types/TaskOutputDto.ts";
import type {ApiResponseError} from "../types/ApiResponse.ts";
import {useRouter} from "@tanstack/react-router";
import {ErrorComponent} from "../components/ErrorComponent.tsx";


export function Tasks() {
  const router = useRouter()

  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<Array<TaskOutputDto>>([]);
  const [error, setError] = useState<ApiResponseError | undefined>(undefined);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);

      const response = await getTasks();

      if (response.success) {
        setTasks(response.data);
      } else {
        setError(response);
      }
      setLoading(false);
    }

    void fetchTasks()
  }, []);

  const handleToggle = async (taskId: number) => {
    setLoading(true);
    const response = await toggleTaskCompleted(taskId);
    if (response.success) {
      setTasks(tasks => tasks.map(task => {
        if (task.id !== response.data.id) {
          return task;
        }
        return response.data;
      }))
    } else {
      setError(response);
    }
    setLoading(false);
  }

  const handleDelete = async (taskId: number) => {
    setLoading(true);
    const response = await deleteTask(taskId);
    if (response.success) {
      setTasks(tasks => tasks.filter(task => task.id !== taskId))
    } else {
      setError(response);
    }
    setLoading(false);
  }

  return <>
    <Group justify="space-between" align="center">
      <h3>Tasks</h3>
      <Button onClick={() => router.navigate({ to: "/tasks/new" })}>
        New Task
      </Button>
    </Group>
    <Card withBorder>
      <ErrorComponent error={error} clearError={() => setError(undefined)} />
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      <TasksTable
        tasks={tasks}
        onOpen={(task) => router.navigate({to: `/tasks/$taskId`, params: {taskId: task.id.toString()}})}
        onToggleCompleted={(task) => handleToggle(task.id)}
        onDelete={(task) => handleDelete(task.id)}
      />
    </Card>
  </>
}

