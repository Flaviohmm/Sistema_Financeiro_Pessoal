package com.finance.dto;

public class UserResponseDTO {

    private Long id;
    private String name;
    private String email;

    public UserResponseDTO(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
