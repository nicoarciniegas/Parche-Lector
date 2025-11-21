package com.parchelector.service;

import com.parchelector.dto.request.LoginRequest;
import com.parchelector.dto.request.RegisterRequest;
import com.parchelector.dto.response.AuthResponse;
import com.parchelector.model.entity.User;
import com.parchelector.repository.UserRepository;
import com.parchelector.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service for authentication operations.
 * 
 * @author Nicolas Arciniegas
 */
@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    /**
     * Register a new user.
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Validate username
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }

        // Validate email
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setActive(true);
        user.setRole("USER");

        User savedUser = userRepository.save(user);

        // Generate token
        String token = tokenProvider.generateTokenFromUsername(savedUser.getUsername());

        return new AuthResponse(
                token,
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getRole()
        );
    }

    /**
     * Login a user.
     */
    public AuthResponse login(LoginRequest request) {
        // Authenticate user
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsernameOrEmail(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Get user details
        User user = userRepository.findByUsernameOrEmail(
                        request.getUsernameOrEmail(),
                        request.getUsernameOrEmail()
                )
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        // Generate token
        String token = tokenProvider.generateToken(authentication);

        return new AuthResponse(
                token,
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
