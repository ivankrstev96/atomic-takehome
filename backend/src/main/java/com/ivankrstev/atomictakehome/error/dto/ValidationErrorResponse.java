package com.ivankrstev.atomictakehome.error.dto;

import java.util.List;

public record ValidationErrorResponse(
        int status,
        String message,
        List<ValidationError> errors
) {}