package com.carriOkay.service;

import com.carriOkay.model.User;
import com.carriOkay.model.CounsellingSession;
import com.carriOkay.model.Resource;
import java.util.List;

public interface AdminService {
    List<User> getAllUsers();
    User updateUserRole(Long userId, User.Role role);
    
    
    void deleteUser(Long userId);
    List<CounsellingSession> getAllSessions();
      Resource createResource(Resource resource);
    
    void deleteResource(Long resourceId);
    long getTotalUsersCount();
    long getTotalSessionsCount();
}