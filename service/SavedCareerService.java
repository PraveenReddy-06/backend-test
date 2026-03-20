package com.carriOkay.service;

import com.carriOkay.model.SavedCareer;
import java.util.List;

public interface SavedCareerService {
    SavedCareer saveCareer(Long userId, Long careerId);
    List<SavedCareer> getSavedCareersByUser(Long userId);
    
    
    void removeSavedCareer(Long savedCareerId);
    boolean isCareerSavedByUser(Long userId, Long careerId);
}