package com.finance.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppController {

    @GetMapping("/info")
    public Map<String, Object> info() {
        return Map.of(
                "app", "Finance System",
                "status", "running",
                "version", "1.0.0"
        );
    }
}
