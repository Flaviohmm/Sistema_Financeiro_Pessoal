package com.finance.controller;

import com.finance.dto.TransactionDTO;
import com.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<TransactionDTO> getAll(Authentication auth) {
        return service.getAll(auth.getName());
    }

    @PostMapping
    public TransactionDTO create(@RequestBody TransactionDTO dto,
                                 Authentication auth) {
        return service.create(dto, auth.getName());
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
