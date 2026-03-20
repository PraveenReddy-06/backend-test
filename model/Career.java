package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "careers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Career {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String requiredSkills;
    private String educationRequired;
    private Double averageSalary;
    private Double growthRate;
    private String industry;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}