package com.carriOkay.service.Implementation;

import com.carriOkay.exception.ResourceNotFoundException;
import com.carriOkay.model.User;
import com.carriOkay.repository.UserRepository;
import com.carriOkay.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public User getUserById(Long id) {
        // FIX: returns 404 instead of 500
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public User updateUser(Long id, User updatedUser) {
        User existing = getUserById(id);

        if (updatedUser.getName() != null) {
            existing.setName(updatedUser.getName());
        }
        if (updatedUser.getEmail() != null) {
            existing.setEmail(updatedUser.getEmail());
        }
       
        if (updatedUser.getRole() != null) {
            existing.setRole(updatedUser.getRole());
        }

        return userRepository.save(existing);
    }

    @Override
    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    @Override
    public User updateLastLogin(Long id) {
        User user = getUserById(id);
        user.setLastLogin(LocalDateTime.now());
        return userRepository.save(user);
    }
}