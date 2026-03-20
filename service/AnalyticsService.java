package com.carriOkay.service;

import com.carriOkay.model.Analytics;
import java.util.List;

public interface AnalyticsService {
    Analytics recordMetric(Analytics analytics);
    Analytics getMetricById(Long id);
    List<Analytics> getAllMetrics();
    List<Analytics> getMetricsByName(String metricName);
    
     Analytics updateMetric(Long id, Analytics analytics);
    void deleteMetric(Long id);
    double getAverageMetricValue(String metricName);
}