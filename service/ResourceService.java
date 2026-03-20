package com.carriOkay.service;

import com.carriOkay.model.Resource;
import java.util.List;

public interface ResourceService {
    Resource createResource(Resource resource);
    Resource getResourceById(Long id);
    List<Resource> getAllResources();
    List<Resource> getResourcesByCategory(String category);
    List<Resource> getResourcesByAdmin(Long adminId);
    Resource updateResource(Long id, Resource resource);
    void deleteResource(Long id);
}