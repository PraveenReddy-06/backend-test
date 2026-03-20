package com.carriOkay.service;

import com.carriOkay.model.CareerComparison;
import java.util.List;

public interface CareerComparisonService {
    CareerComparison compareCareers(Long userId, Long careerId1, Long careerId2);
  
    List<CareerComparison> getComparisonsByUser(Long userId);
    void deleteComparison(Long id);
    CareerComparison getComparisonById(Long id);
}