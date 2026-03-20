package com.carriOkay.service.Implementation;

import com.carriOkay.exception.ResourceNotFoundException;
import com.carriOkay.model.Career;
import com.carriOkay.repository.CareerRepository;
import com.carriOkay.service.CareerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CareerServiceImpl implements CareerService {

    private final CareerRepository careerRepository;

    @Override
    public Career createCareer(Career career) {
        // FIX: removed manual setCreatedAt() — @CreationTimestamp on the entity handles it
        return careerRepository.save(career);
    }

    @Override
    public Career getCareerById(Long id) {
        // FIX: returns 404 instead of 500
        return careerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Career not found with id: " + id));
    }

    @Override
    public List<Career> getAllCareers() {
        return careerRepository.findAll();
    }

    @Override
    public List<Career> getCareersByIndustry(String industry) {
        return careerRepository.findByIndustry(industry);
    }

    @Override
    public Career updateCareer(Long id, Career updatedCareer) {
        Career existing = getCareerById(id);
        if (updatedCareer.getTitle() != null)            existing.setTitle(updatedCareer.getTitle());
        if (updatedCareer.getDescription() != null)      existing.setDescription(updatedCareer.getDescription());
        if (updatedCareer.getRequiredSkills() != null)   existing.setRequiredSkills(updatedCareer.getRequiredSkills());
        if (updatedCareer.getEducationRequired() != null) existing.setEducationRequired(updatedCareer.getEducationRequired());
        if (updatedCareer.getAverageSalary() != null)    existing.setAverageSalary(updatedCareer.getAverageSalary());
        if (updatedCareer.getGrowthRate() != null)       existing.setGrowthRate(updatedCareer.getGrowthRate());
        if (updatedCareer.getIndustry() != null)         existing.setIndustry(updatedCareer.getIndustry());
        return careerRepository.save(existing);
    }

    @Override
    public void deleteCareer(Long id) {
        Career career = getCareerById(id);
        careerRepository.delete(career);
    }

    @Override
    public List<Career> searchCareers(String keyword) {
        return careerRepository.searchByKeyword(keyword);
    }
}