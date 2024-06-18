package com.example.demo.controller;

import com.example.demo.config.UserDetailsServiceImpl;
import com.example.demo.dto.SingleAnnouncementDto;
import com.example.demo.model.Announcement;
import com.example.demo.model.User;
import com.example.demo.dto.AuthenticateResponse;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.token.AuthenticateService;
import com.example.demo.service.user.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.json.JSONObject;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
public class AuthenticateController {

    private final AuthenticateService authService;
    private final UserRepository userRepository;
    private final UserDetailsServiceImpl userDetailsServiceImpl;
    private final UserService userService;

    public AuthenticateController(AuthenticateService authService, UserRepository userRepository, UserDetailsServiceImpl userDetailsServiceImpl, UserService userService) {
        this.authService = authService;
        this.userRepository = userRepository;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticateResponse> register(
            @RequestBody User request
    ) {
        return ResponseEntity.ok(authService.register(request));
    }

    @PostMapping("/login")
    public void login(
            @RequestBody User request,
            HttpServletResponse response
    ) throws IOException {
        final UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(request.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(userDetails.getUsername());
        AuthenticateResponse authenticationResponse = authService.login(request);

        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .toString());
        }

        response.setHeader("Access-Control-Expose-Headers", "Authorization");
        response.setHeader("Access-Control-Allow-Headers", "Authorization, X-Pingother, Origin, X-Requested-With, Content-Type, Accept, X-Custom-Header");
        response.setHeader("Authorization", authenticationResponse.getToken());
    }

    @GetMapping("/announcements")
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = userService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/announcements/{id}")
    public ResponseEntity<SingleAnnouncementDto> getAnnouncementById(@PathVariable Long id) {
        Optional<SingleAnnouncementDto> announcement = Optional.ofNullable(userService.getAnnouncementById(id));
        return announcement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
