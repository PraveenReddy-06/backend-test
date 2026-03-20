package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "career_comparisons")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CareerComparison {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "career_id1", nullable = false)
    private Career career1;

    @ManyToOne
    @JoinColumn(name = "career_id2", nullable = false)
    private Career career2;

    private LocalDateTime comparedAt;
}