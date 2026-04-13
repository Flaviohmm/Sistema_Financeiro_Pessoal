package com.finance.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Goal {
    @Id @GeneratedValue
    private Long id;

    private String name;
    private Double targetAmount;
    private Double currentAmount;
}
