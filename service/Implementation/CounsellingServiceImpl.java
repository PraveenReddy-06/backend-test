package com.carriOkay.service.Implementation;

import com.carriOkay.exception.ConflictException;
import com.carriOkay.exception.ResourceNotFoundException;
import com.carriOkay.model.CounsellingSession;
import com.carriOkay.model.CounsellingSession.SessionStatus;
import com.carriOkay.repository.CounsellingSessionRepository;
import com.carriOkay.service.CounsellingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CounsellingServiceImpl implements CounsellingService {

    private final CounsellingSessionRepository sessionRepository;

    @Override
    public CounsellingSession bookSession(CounsellingSession session) {
        boolean alreadyBooked = sessionRepository
                .existsByCounsellorAndSessionDateAndSessionTimeAndStatusNot(
                        session.getCounsellor(),
                        session.getSessionDate(),
                        session.getSessionTime(),
                        SessionStatus.CANCELLED
                );
        if (alreadyBooked) {
            throw new ConflictException(
                    "Counsellor is already booked on " + session.getSessionDate()
                    + " at " + session.getSessionTime()
            );
        }
        session.setStatus(SessionStatus.SCHEDULED);
        return sessionRepository.save(session);
    }

    @Override
    public CounsellingSession getSessionById(Long id) {
        return sessionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Session not found with id: " + id));
    }

    @Override
    public List<CounsellingSession> getSessionsByUser(Long userId) {
        return sessionRepository.findByUserId(userId);
    }

    @Override
    public List<CounsellingSession> getSessionsByStatus(SessionStatus status) {
        return sessionRepository.findByStatus(status);
    }

    @Override
    public CounsellingSession updateSessionStatus(Long id, SessionStatus status) {
        CounsellingSession session = getSessionById(id);
        session.setStatus(status);
        return sessionRepository.save(session);
    }

    @Override
    public CounsellingSession updateSession(Long id, CounsellingSession updatedSession) {
        CounsellingSession existing = getSessionById(id);
        if (updatedSession.getSessionDate() != null) existing.setSessionDate(updatedSession.getSessionDate());
        if (updatedSession.getSessionTime() != null) existing.setSessionTime(updatedSession.getSessionTime());
        if (updatedSession.getSessionType() != null) existing.setSessionType(updatedSession.getSessionType());
        if (updatedSession.getNotes() != null)       existing.setNotes(updatedSession.getNotes());
        return sessionRepository.save(existing);
    }

    @Override
    public void cancelSession(Long id) {
        CounsellingSession session = getSessionById(id);
        session.setStatus(SessionStatus.CANCELLED);
        sessionRepository.save(session);
    }

    @Override
    public List<CounsellingSession> getSessionsByCounsellor(Long counsellorId) {
        return sessionRepository.findByCounsellorId(counsellorId);
    }
}