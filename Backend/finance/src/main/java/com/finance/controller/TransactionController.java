package com.finance.controller;

import com.finance.dto.TransactionDTO;
import com.finance.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public List<TransactionDTO> getAll() {
        return service.getAll();
    }

    @PostMapping
    public TransactionDTO create(@RequestBody TransactionDTO dto) {
        return service.create(dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
