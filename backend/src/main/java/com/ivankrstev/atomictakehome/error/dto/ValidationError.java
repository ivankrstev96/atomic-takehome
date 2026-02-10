package com.ivankrstev.atomictakehome.error.dto;

public record ValidationError(
        String field,
        String message
) {}