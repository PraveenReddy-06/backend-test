package com.carriOkay.service.Implementation;

import com.carriOkay.exception.ResourceNotFoundException;
import com.carriOkay.model.Career;
import com.carriOkay.model.QuizQuestion;
import com.carriOkay.model.QuizResult;
import com.carriOkay.model.User;
import com.carriOkay.repository.CareerRepository;
import com.carriOkay.repository.QuizQuestionRepository;
import com.carriOkay.repository.QuizResultRepository;
import com.carriOkay.repository.UserRepository;
import com.carriOkay.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizQuestionRepository quizQuestionRepository;
    private final QuizResultRepository quizResultRepository;
    private final UserRepository userRepository;
    private final CareerRepository careerRepository;

    @Override
    public List<QuizQuestion> getAllQuestions() {
        return quizQuestionRepository.findAll();
    }

    @Override
    public QuizQuestion addQuestion(QuizQuestion question) {
        return quizQuestionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long id) {
        QuizQuestion question = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        quizQuestionRepository.delete(question);
    }

    @Override
    public QuizQuestion updateQuestion(Long id, QuizQuestion updatedQuestion) {
        QuizQuestion existing = quizQuestionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
        if (updatedQuestion.getQuestionText() != null) existing.setQuestionText(updatedQuestion.getQuestionText());
        if (updatedQuestion.getOptionA() != null)      existing.setOptionA(updatedQuestion.getOptionA());
        if (updatedQuestion.getOptionB() != null)      existing.setOptionB(updatedQuestion.getOptionB());
        if (updatedQuestion.getOptionC() != null)      existing.setOptionC(updatedQuestion.getOptionC());
        if (updatedQuestion.getOptionD() != null)      existing.setOptionD(updatedQuestion.getOptionD());
        if (updatedQuestion.getCategory() != null)     existing.setCategory(updatedQuestion.getCategory());
        if (updatedQuestion.getCorrectAnswer() != null) existing.setCorrectAnswer(updatedQuestion.getCorrectAnswer());
        return quizQuestionRepository.save(existing);
    }

    @Override
    public QuizResult submitQuiz(Long userId, Map<Long, String> answers) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        // FIX: track both total correct answers AND category scores separately
        int totalCorrect = 0;
        Map<String, Integer> categoryScore = new HashMap<>();

        for (Map.Entry<Long, String> entry : answers.entrySet()) {
            QuizQuestion question = quizQuestionRepository.findById(entry.getKey())
                    .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + entry.getKey()));

       
            String submitted = entry.getValue();
            String correct = question.getCorrectAnswer();
            if (submitted != null && submitted.trim().equalsIgnoreCase(correct)) {
                totalCorrect++;
             
                String category = question.getCategory();
                categoryScore.merge(category, 1, Integer::sum);
            }
        }

      
        String recommendedCategory = categoryScore.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse(null);

        
        Career recommendedCareer = null;
        if (recommendedCategory != null) {
            List<Career> matchingCareers = careerRepository.findByIndustry(recommendedCategory);
            if (!matchingCareers.isEmpty()) {
                recommendedCareer = matchingCareers.get(0);
            }
        }

        
        QuizResult result = QuizResult.builder()
                .user(user)
                .recommendedCareer(recommendedCareer)
                .score(totalCorrect)
                .build();
        return quizResultRepository.save(result);
    }

    @Override
    public List<QuizResult> getResultsByUser(Long userId) {
        return quizResultRepository.findByUserId(userId);
    }

    @Override
    public QuizResult getResultById(Long resultId) {
        return quizResultRepository.findById(resultId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz result not found with id: " + resultId));
    }

    @Override
    public List<QuizQuestion> getQuestionsByCategory(String category) {
        return quizQuestionRepository.findByCategory(category);
    }
}