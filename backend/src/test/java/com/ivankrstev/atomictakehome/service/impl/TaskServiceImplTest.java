package com.ivankrstev.atomictakehome.service.impl;

import com.ivankrstev.atomictakehome.dto.TaskInputDto;
import com.ivankrstev.atomictakehome.dto.TaskOutputDto;
import com.ivankrstev.atomictakehome.dto.mapper.TaskMapper;
import com.ivankrstev.atomictakehome.model.Task;
import com.ivankrstev.atomictakehome.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceImplTest {

    @Mock
    private TaskRepository taskRepository;

    @Spy
    private TaskMapper taskMapper;

    @InjectMocks
    private TaskServiceImpl taskService;

    private Task task;
    private TaskInputDto taskInputDto;

    @BeforeEach
    void setUp() {
        task = Task.builder()
                .id(1L)
                .title("Test Task")
                .description("Test Description")
                .isCompleted(false)
                .build();

        taskInputDto = new TaskInputDto();
        taskInputDto.setTitle("Test Task Update");
        taskInputDto.setDescription("Test Description Update");
        taskInputDto.setIsCompleted(false);
    }

    @Test
    void findAll_shouldReturnListOfTasks() {
        // Given
        when(taskRepository.findAll()).thenReturn(List.of(task));

        // When
        List<TaskOutputDto> result = taskService.findAll();

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.get(0).getTitle()).isEqualTo(task.getTitle());
        verify(taskRepository, times(1)).findAll();
        verify(taskMapper, times(1)).toOutputDto(any(Task.class));
    }

    @Test
    void find_whenIdExists_shouldReturnTask() {
        // Given
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // When
        TaskOutputDto result = taskService.find(1L);

        // Then
        assertThat(result.getTitle()).isEqualTo(task.getTitle());
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void find_whenIdDoesNotExist_shouldThrowException() {
        // Given
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> taskService.find(1L))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("Task not found with id: 1");
        
        verify(taskRepository, times(1)).findById(1L);
    }

    @Test
    void insert_shouldSaveAndReturnTask() {
        // Given
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> {
            Task savedTask = invocation.getArgument(0);
            savedTask.setId(1L);
            return savedTask;
        });

        // When
        TaskOutputDto result = taskService.insert(taskInputDto);

        // Then
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo(taskInputDto.getTitle());
        verify(taskRepository, times(1)).save(argThat(task -> 
            task.getCreatedAt() != null && task.getUpdatedAt() != null
        ));
    }

    @Test
    void update_whenIdExists_shouldUpdateAndReturnTask() {
        // Given
        LocalDateTime originalCreatedAt = LocalDateTime.now().minusDays(1);
        task.setCreatedAt(originalCreatedAt);

        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When
        TaskOutputDto result = taskService.update(1L, taskInputDto);

        // Then
        assertThat(result.getTitle()).isEqualTo(taskInputDto.getTitle());
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(argThat(updatedTask -> 
            updatedTask.getCreatedAt().equals(originalCreatedAt) &&
            updatedTask.getUpdatedAt() != null
        ));
    }

    @Test
    void delete_whenIdExists_shouldCallDelete() {
        // Given
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        // When
        taskService.delete(1L);

        // Then
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).deleteById(1L);
    }

    @Test
    void delete_whenIdDoesNotExist_shouldThrowException() {
        // Given
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> taskService.delete(1L))
                .isInstanceOf(ResponseStatusException.class);
        
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, never()).deleteById(any());
    }

    @Test
    void toggleCompleted_shouldToggleCompleted() {
        // Given
        Boolean originalCompleted = task.getIsCompleted();
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        // When
        taskService.toggleCompleted(1L);

        // Then
        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, times(1)).save(argThat(updatedTask ->
                !updatedTask.getIsCompleted().equals(originalCompleted)
        ));
    }

    @Test
    void toggleCompleted_whenIdDoesNotExist_shouldThrowException() {
        // Given
        when(taskRepository.findById(1L)).thenReturn(Optional.empty());

        // When/Then
        assertThatThrownBy(() -> taskService.toggleCompleted(1L))
                .isInstanceOf(ResponseStatusException.class);

        verify(taskRepository, times(1)).findById(1L);
        verify(taskRepository, never()).save(any());
    }
}
