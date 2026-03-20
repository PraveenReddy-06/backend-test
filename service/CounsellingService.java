package com.carriOkay.service;

import com.carriOkay.model.CounsellingSession;
import com.carriOkay.model.CounsellingSession.SessionStatus;

import java.util.List;

public interface CounsellingService {
    CounsellingSession bookSession(CounsellingSession session);
    CounsellingSession getSessionById(Long id);
    List<CounsellingSession> getSessionsByUser(Long userId);
    List<CounsellingSession> getSessionsByStatus(SessionStatus status);
    CounsellingSession updateSessionStatus(Long id, SessionStatus status);
    CounsellingSession updateSession(Long id, CounsellingSession session);
    void cancelSession(Long id);
    List<CounsellingSession> getSessionsByCounsellor(Long counsellorId);
}