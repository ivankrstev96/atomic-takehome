export type TaskOutputDto = {
  id: number;
  title: string;
  description?: string;
  isCompleted: boolean;
  dueDate?: string;
}