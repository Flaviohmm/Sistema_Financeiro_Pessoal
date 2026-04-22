package com.finance.dto;

public record TransactionDTO(
        Long id,
        String description,
        Double amount,
        String type,
        String category,
        String date
) { }
