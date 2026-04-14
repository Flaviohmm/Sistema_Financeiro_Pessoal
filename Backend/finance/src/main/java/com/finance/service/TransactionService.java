package com.finance.service;

import com.finance.dto.TransactionDTO;
import com.finance.entity.Transaction;
import com.finance.entity.User;
import com.finance.repository.TransactionRepository;
import com.finance.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Autowired
    private UserRepository userRepository;

    public List<TransactionDTO> getAll(String email) {
        return repository.findByUserEmail(email)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public TransactionDTO create(TransactionDTO dto, String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Transaction t = new Transaction();
        t.setDescription(dto.description());
        t.setAmount(dto.amount());
        t.setType(dto.type());
        t.setCategory(dto.category());
        t.setDate(LocalDate.parse(dto.date()));

        t.setUser(user);

        return toDTO(repository.save(t));
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
