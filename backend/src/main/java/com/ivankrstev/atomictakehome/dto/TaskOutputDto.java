package com.ivankrstev.atomictakehome.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TaskOutputDto {

    private Long id;

    private String title;

    private String description;

    private Boolean isCompleted;

    private LocalDateTime dueDate;

}