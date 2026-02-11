import {Button, Group, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Text} from '@mantine/core';
import dayjs from "dayjs";
import type {TaskOutputDto} from "../types/TaskOutputDto.ts";


interface TaskTableProps {
  tasks: Array<TaskOutputDto>;
  onOpen: (task: TaskOutputDto) => void;
  onToggleCompleted: (task: TaskOutputDto) => void;
  onDelete: (task: TaskOutputDto) => void;
}

export function TasksTable({tasks, onOpen, onToggleCompleted, onDelete}: TaskTableProps) {
  return (
    <Table highlightOnHover>
      <TableThead>
        <TableTr>
          <TableTh>Title</TableTh>
          <TableTh>Description</TableTh>
          <TableTh>Completed</TableTh>
          <TableTh>Due Date</TableTh>
          <TableTh>Actions</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>
        {tasks.map((task) => (
          <TableTr key={task.id}>
            <TableTd>
              <Text>{task.title}</Text>
            </TableTd>
            <TableTd>
              <Text lineClamp={1}>
                {task.description}
              </Text>
            </TableTd>
            <TableTd>
              {task.isCompleted ? "Yes" : "No"}
            </TableTd>
            <TableTd>{task.dueDate ? dayjs(task.dueDate).format("YYYY-MM-DD HH:mm") : '-'}</TableTd>
            <TableTd>
              <Group>
                <Button size="xs" variant="outline" onClick={() => onOpen(task)}>
                  View
                </Button>
                <Button
                  size="xs"
                  color={task.isCompleted ? 'orange' : 'green'}
                  onClick={() => onToggleCompleted(task)}
                >
                  {task.isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                </Button>
                <Button
                  size="xs"
                  color={'red'}
                  onClick={() => onDelete(task)}
                >
                  Delete
                </Button>
              </Group>
            </TableTd>
          </TableTr>
        ))}
      </TableTbody>
    </Table>
  );
}