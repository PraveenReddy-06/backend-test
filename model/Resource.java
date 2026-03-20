package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "resources")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String category;

    @Column(columnDefinition = "TEXT")
    private String description;

    private String link;

    @ManyToOne
    @JoinColumn(name = "created_by_admin_id")
    private User createdByAdmin;

    // FIX: auto-set at insert time
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
}