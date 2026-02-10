import {type SyntheticEvent, useState} from "react";
import {
  TextInput,
  Textarea,
  Switch,
  Button,
  Stack,
  Group,
  Text
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import type {TaskInputDto} from "../types/TaskInputDto.ts";
import type {TaskOutputDto} from "../types/TaskOutputDto.ts";
import dayjs from "dayjs";


type Props = {
  task?: TaskOutputDto;
  viewOnly: boolean;
  submitting?: boolean;
  onSubmit: (task: TaskInputDto) => void;
};

export function TaskForm(props: Props) {
  const { task, submitting, viewOnly, onSubmit } = props;

  const [title, setTitle] = useState<string>(task?.title ?? "");
  const [description, setDescription] = useState<string | undefined>(task?.description);
  const [isCompleted, setIsCompleted] = useState<boolean | undefined>(task?.isCompleted);
  const [dueDate, setDueDate] = useState<string | undefined>(task?.dueDate);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit({
      title,
      description,
      isCompleted,
      dueDate
    })
  };

  if (viewOnly) {
    return <Stack>
      <Text>
        <b>Title:</b> {title || "-"}
      </Text>
      <Text>
        <b>Description:</b> {description || "-"}
      </Text>
      <Text>
        <b>Completed:</b> {isCompleted ? "Yes" : "No"}
      </Text>
      <Text>
        <b>Due date:</b>{" "}
        {dueDate ? dayjs(dueDate).format("YYYY-MM-DD HH:mm") : "-"}
      </Text>
    </Stack>
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          disabled={submitting}
        />
        <Textarea
          label="Description"
          minRows={3}
          value={description ?? ""}
          onChange={(e) => setDescription(e.currentTarget.value)}
          disabled={submitting}
        />

        <Switch
          label="Completed"
          checked={isCompleted ?? false}
          onChange={(e) => setIsCompleted(e.currentTarget.checked)}
          disabled={submitting}
        />

        <DateTimePicker
          label="Due date"
          value={dueDate ?? ""}
          onChange={value => setDueDate(value ? dayjs(value).format("YYYY-MM-DDTHH:mm:ss") : undefined)}
          clearable
          disabled={submitting}
        />

        {!viewOnly && <Group justify="flex-end">
            <Button type="submit" loading={submitting} disabled={submitting}>
                Submit
            </Button>
        </Group>}
      </Stack>
    </form>
  );
}