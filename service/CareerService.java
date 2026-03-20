package com.carriOkay.service;

import com.carriOkay.model.Career;
import java.util.List;

public interface CareerService {
    Career createCareer(Career career);
    Career getCareerById(Long id);
    List<Career> getAllCareers();
    List<Career> getCareersByIndustry(String industry);
    Career updateCareer(Long id, Career career);
    void deleteCareer(Long id);
    List<Career> searchCareers(String keyword);
}