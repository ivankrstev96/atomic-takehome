package com.ivankrstev.atomictakehome.error.dto;

public record ApiErrorResponse(
        int status,
        String message
) {}