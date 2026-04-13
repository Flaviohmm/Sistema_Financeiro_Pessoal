package com.finance.service;

import com.finance.dto.TransactionDTO;
import com.finance.entity.Transaction;
import com.finance.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    public List<TransactionDTO> getAll() {
        return repository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public TransactionDTO create(TransactionDTO dto) {
        Transaction transaction = new Transaction();
        transaction.setDescription(dto.description());
        transaction.setAmount(dto.amount());
        transaction.setType(dto.type());
        transaction.setCategory(dto.category());
        transaction.setDate(LocalDate.parse(dto.date()));

        return toDTO(repository.save(transaction));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private TransactionDTO toDTO(Transaction t) {
        return new TransactionDTO(
                t.getId(),
                t.getDescription(),
                t.getAmount(),
                t.getType(),
                t.getCategory(),
                t.getDate().toString()
        );
    }
}
