package com.ivankrstev.atomictakehome.dto.mapper;

import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;
import com.ivankrstev.atomictakehome.model.Task;

public class TaskMapper {

    public static Task fromInputDto(TaskInputDto inputDto) {
        Boolean isCompleted = inputDto.getIsCompleted() == null ? false : inputDto.getIsCompleted();
        return Task.builder()
                .title(inputDto.getTitle())
                .description(inputDto.getDescription())
                .isCompleted(isCompleted)
                .dueDate(inputDto.getDueDate())
                .build();
    }

    public static TaskOutputDto toOutputDto(Task task) {
        return TaskOutputDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .isCompleted(task.getIsCompleted())
                .dueDate(task.getDueDate())
                .build();
    }
}
