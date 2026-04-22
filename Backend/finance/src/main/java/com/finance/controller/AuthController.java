package com.finance.controller;

import com.finance.dto.AuthResponseDTO;
import com.finance.dto.LoginDTO;
import com.finance.dto.UserDTO;
import com.finance.entity.User;
import com.finance.repository.UserRepository;
import com.finance.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder encoder;

    @PostMapping("/register")
    public String register(@RequestBody UserDTO dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(encoder.encode(dto.getPassword()));

        repository.save(user);

        return jwtService.generateToken(user.getEmail());
    }

    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginDTO dto) {
        User dbUser = repository.findByEmail(dto.email())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!encoder.matches(dto.password(), dbUser.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(dbUser.getEmail());

        return new AuthResponseDTO(token, dbUser.getEmail());
    }
}
