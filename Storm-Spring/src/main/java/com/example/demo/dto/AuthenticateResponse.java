package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthenticateResponse {
    private String token;
    private String message;

    public AuthenticateResponse(String token, String message) {
        this.token = token;
        this.message = message;
    }
}
