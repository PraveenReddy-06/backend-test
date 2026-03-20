package com.carriOkay.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "counsellors")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Counsellor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String specialization;
    private Integer experienceYears;
    private Double rating;

    @Column(unique = true)
    private String email;

    private Boolean availabilityStatus;
}