package com.xebia.lms.controller;

import com.xebia.lms.model.User;
import com.xebia.lms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String emailOrUsername = credentials.get("email");
        if (emailOrUsername == null || emailOrUsername.isEmpty()) {
            emailOrUsername = credentials.get("username");
        }
        String password = credentials.get("password");

        if (emailOrUsername == null || password == null) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Email/Username and Password are required");
            return ResponseEntity.badRequest().body(err);
        }

        Optional<User> userOpt = userRepository.findByEmail(emailOrUsername);
        if (!userOpt.isPresent()) {
            userOpt = userRepository.findByUsername(emailOrUsername);
        }

        if (!userOpt.isPresent()) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Invalid email/username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
        }

        User user = userOpt.get();
        // Cleartext check for simplicity in development (or BCrypt matching if needed)
        // Since we are creating passwords via Admin and seeding them, a simple equals check is perfect for dev
        if (!user.getPassword().equals(password)) {
            Map<String, String> err = new HashMap<>();
            err.put("error", "Invalid email/username or password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(err);
        }

        // Return expected NextAuth session structure
        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("name", user.getLearnerName());
        response.put("email", user.getEmail());
        response.put("role", user.getRole().toLowerCase()); // must be "admin" or "learner"
        response.put("token", "jwt-token-for-" + user.getUsername() + "-" + System.currentTimeMillis());

        return ResponseEntity.ok(response);
    }
}
