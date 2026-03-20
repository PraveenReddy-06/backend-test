package com.carriOkay.service;

import com.carriOkay.model.User;
import java.util.List;

public interface UserService {
    User getUserById(Long id);
    User getUserByEmail(String email);
    List<User> getAllUsers();
    
    
    User updateUser(Long id, User user);
    
    void deleteUser(Long id);
    User updateLastLogin(Long id);
}