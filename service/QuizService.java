package com.carriOkay.service;

import com.carriOkay.model.QuizQuestion;
import com.carriOkay.model.QuizResult;
import java.util.List;
import java.util.Map;

public interface QuizService {
    List<QuizQuestion> getAllQuestions();
    
    QuizQuestion addQuestion(QuizQuestion question);
    
    void deleteQuestion(Long id);
    QuizResult submitQuiz(Long userId, Map<Long, String> answers);
    QuizQuestion updateQuestion(Long id, QuizQuestion question);
    List<QuizResult> getResultsByUser(Long userId);
    
    QuizResult getResultById(Long resultId);
    List<QuizQuestion> getQuestionsByCategory(String category);
}