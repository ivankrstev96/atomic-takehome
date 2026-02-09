package com.ivankrstev.atomictakehome.service.impl;


import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;
import com.ivankrstev.atomictakehome.dto.mapper.TaskMapper;
import com.ivankrstev.atomictakehome.model.Task;
import com.ivankrstev.atomictakehome.repository.TaskRepository;
import com.ivankrstev.atomictakehome.service.TaskService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }


    @Override
    public List<TaskOutputDto> findAll() {
        List<Task> tasks = this.taskRepository.findAll();
        return tasks.stream().map(taskMapper::toOutputDto).toList();
    }

    @Override
    public TaskOutputDto find(Long taskId) {
        Task task = this.getOrThrowException(taskId);
        return taskMapper.toOutputDto(task);
    }

    @Override
    @Transactional
    public TaskOutputDto insert(TaskInputDto taskInputDto) {
        Task task = this.setTimestamps(
                taskMapper.fromInputDto(taskInputDto)
        );
        task = this.taskRepository.save(task);
        return taskMapper.toOutputDto(task);
    }

    @Override
    @Transactional
    public TaskOutputDto update(Long taskId, TaskInputDto taskInputDto) {
        Task task = this.setTimestamps(
                this.getOrThrowException(taskId)
        );
        task.setTitle(taskInputDto.getTitle());
        task.setDescription(taskInputDto.getDescription());
        task.setIsCompleted(
                taskInputDto.getIsCompleted() == null ?
                        task.getIsCompleted() :
                        taskInputDto.getIsCompleted()
        );
        task = this.taskRepository.save(task);
        return taskMapper.toOutputDto(task);
    }

    @Override
    public void delete(Long taskId) {
        getOrThrowException(taskId);
        this.taskRepository.deleteById(taskId);
    }

    private Task getOrThrowException(Long taskId) {
        return this.taskRepository
                .findById(taskId)
                .orElseThrow(() -> {
                    log.error("Task not found with id: {}", taskId);
                    return new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Task not found with id: " + taskId
                    );
                });
    }

    private Task setTimestamps(Task task) {
        LocalDateTime now = LocalDateTime.now();
        if (task.getCreatedAt() != null) {
            task.setCreatedAt(now);
        }
        task.setUpdatedAt(now);
        return task;
    }
}
