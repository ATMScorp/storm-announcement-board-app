package com.example.demo.service.token;

import com.example.demo.dto.AuthenticateResponse;
import com.example.demo.model.User;
import com.example.demo.model.Token;
import com.example.demo.repository.TokenRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthenticateService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final AuthenticationManager authenticationManager;

    public AuthenticateService(UserRepository userRepository,
                               PasswordEncoder passwordEncoder,
                               JwtService jwtService,
                               TokenRepository tokenRepository,
                               AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.tokenRepository = tokenRepository;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticateResponse register(User request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthenticateResponse(null, "User already exists");
        }

        User user = new User();
        user.setFirstName(request.getFirstName());
        user.setSecondName(request.getSecondName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user = userRepository.save(user);

        String jwt = jwtService.generateToken(user);

        saveUserToken(jwt, user);

        return new AuthenticateResponse(null, "User registration was successful");
    }

    public AuthenticateResponse login(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow();

        String jwt = jwtService.generateToken(user);

        revokeAllTokenByUser(user);
        saveUserToken(jwt, user);

        return new AuthenticateResponse(jwt, "User login was successful");
    }

    private void revokeAllTokenByUser(User user) {
        List<Token> validTokens = tokenRepository.findAllTokensByUser(user.getId());
        if(validTokens.isEmpty()) {
            return;
        }

        validTokens.forEach(t-> t.setLoggedOut(true));

        tokenRepository.saveAll(validTokens);
    }

    private void saveUserToken(String jwt, User user) {
        Token token = new Token();
        token.setToken(jwt);
        token.setLoggedOut(false);
        token.setUser(user);
        tokenRepository.save(token);
    }
}
