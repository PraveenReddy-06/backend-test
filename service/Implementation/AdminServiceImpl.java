package com.carriOkay.service.Implementation;

import com.carriOkay.model.CounsellingSession;
import com.carriOkay.model.Resource;
import com.carriOkay.model.User;
import com.carriOkay.repository.CounsellingSessionRepository;
import com.carriOkay.service.AdminService;
import com.carriOkay.service.ResourceService;
import com.carriOkay.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserService userService;
    private final ResourceService resourceService;
    private final CounsellingSessionRepository sessionRepository;

    @Override
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @Override
    public User updateUserRole(Long userId, User.Role role) {
        User user = userService.getUserById(userId);
        if (role == null) throw new IllegalArgumentException("Role must not be null");
        user.setRole(role);
        User patch = new User();
        patch.setRole(role);
        return userService.updateUser(userId, patch);
    }

    @Override
    public void deleteUser(Long userId) {
        userService.deleteUser(userId);
    }

    @Override
    public List<CounsellingSession> getAllSessions() {
        return sessionRepository.findAll();
    }

    @Override
    public Resource createResource(Resource resource) {
        return resourceService.createResource(resource);
    }

    @Override
    public void deleteResource(Long resourceId) {
        resourceService.deleteResource(resourceId);
    }

    @Override
    public long getTotalUsersCount() {
        return userService.getAllUsers().size();
    }

    @Override
    public long getTotalSessionsCount() {
        return sessionRepository.count();
    }
}