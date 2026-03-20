package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
// FIX: unique constraint prevents the same career being saved twice by the same user
@Table(name = "saved_careers", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"user_id", "career_id"})
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SavedCareer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "career_id", nullable = false)
    private Career career;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime savedAt;
}