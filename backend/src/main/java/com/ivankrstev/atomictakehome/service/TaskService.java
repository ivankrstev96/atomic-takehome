package com.ivankrstev.atomictakehome.service;

import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;

import java.util.List;

public interface TaskService {

    List<TaskOutputDto> findAll();

    TaskOutputDto find(Long taskId);

    TaskOutputDto insert(TaskInputDto taskInputDto);

    TaskOutputDto update(Long taskId, TaskInputDto taskInputDto);

    void delete(Long taskId);

}
