package com.finance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Transaction {
    @Id @GeneratedValue
    private Long id;

    private String description;
    private Double amount;
    private String type;    // INCOME | EXPENSE
    private String category;
    private LocalDate date;
}
