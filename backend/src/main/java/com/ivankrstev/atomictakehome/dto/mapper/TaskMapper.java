package com.ivankrstev.atomictakehome.dto.mapper;

import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;
import org.springframework.stereotype.Service;
import com.ivankrstev.atomictakehome.model.Task;

@Service
public class TaskMapper {

    public Task fromInputDto(TaskInputDto inputDto) {
        Boolean isCompleted = inputDto.getIsCompleted() == null ? false : inputDto.getIsCompleted();
        return Task.builder()
                .title(inputDto.getTitle())
                .description(inputDto.getDescription())
                .isCompleted(isCompleted)
                .build();
    }

    public TaskOutputDto toOutputDto(Task task) {
        return TaskOutputDto.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .isCompleted(task.getIsCompleted())
                .build();
    }
}
