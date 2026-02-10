package com.ivankrstev.atomictakehome.error;

import com.ivankrstev.atomictakehome.error.dto.ApiErrorResponse;
import com.ivankrstev.atomictakehome.error.dto.ValidationError;
import com.ivankrstev.atomictakehome.error.dto.ValidationErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiErrorResponse> handleResponseStatusException(
            ResponseStatusException ex
    ) {
        ApiErrorResponse error = new ApiErrorResponse(
                ex.getStatusCode().value(),
                ex.getReason()
        );

        return ResponseEntity
                .status(ex.getStatusCode())
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationErrorResponse> handleValidation(
            MethodArgumentNotValidException ex
    ) {
        List<ValidationError> errors = new ArrayList<>();

        ex.getBindingResult()
                .getFieldErrors()
                .forEach(err ->
                        errors.add(new ValidationError(err.getField(), err.getDefaultMessage()))
                );

        ValidationErrorResponse response =
                new ValidationErrorResponse(400, "Validation failed", errors);

        return ResponseEntity.badRequest().body(response);
    }
}