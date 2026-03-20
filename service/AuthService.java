package com.carriOkay.service;

import com.carriOkay.model.User;

public interface AuthService {
    User register(User user);
    String login(String email, String password);
    
    
    void logout(String token);
    boolean validateToken(String token);
}