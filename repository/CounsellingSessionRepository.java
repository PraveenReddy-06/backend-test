package com.carriOkay.repository;

import com.carriOkay.model.Counsellor;
import com.carriOkay.model.CounsellingSession;
import com.carriOkay.model.CounsellingSession.SessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface CounsellingSessionRepository extends JpaRepository<CounsellingSession, Long> {

    List<CounsellingSession> findByUserId(Long userId);

    List<CounsellingSession> findByStatus(SessionStatus status);

    List<CounsellingSession> findByCounsellorId(Long counsellorId);

   
    boolean existsByCounsellorAndSessionDateAndSessionTimeAndStatusNot(
            Counsellor counsellor,
            LocalDate sessionDate,
            LocalTime sessionTime,
            SessionStatus status
    );
}