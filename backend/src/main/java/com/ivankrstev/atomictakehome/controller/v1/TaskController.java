package com.ivankrstev.atomictakehome.controller.v1;

import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;
import com.ivankrstev.atomictakehome.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("api/v1/tasks")
public class TaskController {

    private final TaskService taskService;

    @GetMapping()
    public ResponseEntity<List<TaskOutputDto>> findAllTasks() {
        List<TaskOutputDto> taskOutputDtos = this.taskService.findAll();
        return ResponseEntity.ok(taskOutputDtos);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<TaskOutputDto> findTask(@PathVariable Long id) {
        TaskOutputDto taskDto = this.taskService.find(id);
        return ResponseEntity.ok(taskDto);
    }

    @PostMapping()
    public ResponseEntity<TaskOutputDto> insert(
            @RequestBody @Valid TaskInputDto taskInputDto
    ) {
        TaskOutputDto taskOutputDto = this.taskService.insert(taskInputDto);
        return ResponseEntity.ok(taskOutputDto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskOutputDto> update(
            @PathVariable Long id,
            @RequestBody @Valid TaskInputDto taskInputDto
    ) {
        TaskOutputDto taskOutputDto = this.taskService.update(id, taskInputDto);
        return ResponseEntity.ok(taskOutputDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable Long id) {
        this.taskService.delete(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @PostMapping("/{id}/toggle")
    public ResponseEntity<TaskOutputDto> toggleCompleted(@PathVariable Long id) {
        TaskOutputDto taskOutputDto = this.taskService.toggleCompleted(id);
        return ResponseEntity.ok(taskOutputDto);
    }

}
