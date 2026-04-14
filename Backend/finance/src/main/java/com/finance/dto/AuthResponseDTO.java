package com.finance.dto;

public record AuthResponseDTO(
        String token,
        String email
) {
}
