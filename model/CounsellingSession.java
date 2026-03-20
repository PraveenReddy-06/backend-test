package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "counseling_sessions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CounsellingSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "counsellor_id", nullable = false)
    private Counsellor counsellor;

    private LocalDate sessionDate;
    private LocalTime sessionTime;

    @Enumerated(EnumType.STRING)
    private SessionType sessionType;

    @Enumerated(EnumType.STRING)
    private SessionStatus status;

    @Column(columnDefinition = "TEXT")
    private String notes;

    public enum SessionType {
        ONLINE, OFFLINE
    }

    public enum SessionStatus {
        SCHEDULED, COMPLETED, CANCELLED
    }
}