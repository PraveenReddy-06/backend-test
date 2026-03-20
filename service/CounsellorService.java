package com.carriOkay.service;

import com.carriOkay.model.Counsellor;
import java.util.List;

public interface CounsellorService {
    Counsellor addCounsellor(Counsellor counsellor);
    Counsellor getCounsellorById(Long id);

    List<Counsellor> getCounsellorsBySpecialization(String specialization);
    Counsellor updateCounsellor(Long id, Counsellor counsellor);
    Counsellor updateAvailability(Long id, Boolean status);
    void deleteCounsellor(Long id);
    
    List<Counsellor> getAllCounsellors();
    List<Counsellor> getAvailableCounsellors();
}