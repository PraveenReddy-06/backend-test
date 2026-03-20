package com.carriOkay.repository;

import com.carriOkay.model.Career;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CareerRepository extends JpaRepository<Career, Long> {

    
    @Query("SELECT c FROM Career c WHERE LOWER(c.industry) = LOWER(:industry)")
    List<Career> findByIndustry(@Param("industry") String industry);

    @Query("SELECT c FROM Career c WHERE " +
           "LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.requiredSkills) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    List<Career> searchByKeyword(@Param("keyword") String keyword);
}