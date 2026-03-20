package com.carriOkay.controller;

import com.carriOkay.model.QuizQuestion;
import com.carriOkay.model.QuizResult;
import com.carriOkay.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/questions")
    public ResponseEntity<List<QuizQuestion>> getAllQuestions() {
        return ResponseEntity.ok(quizService.getAllQuestions());
    }

    @GetMapping("/questions/category")
    public ResponseEntity<List<QuizQuestion>> getQuestionsByCategory(@RequestParam String category) {
        return ResponseEntity.ok(quizService.getQuestionsByCategory(category));
    }

    @PostMapping("/questions")
    public ResponseEntity<QuizQuestion> addQuestion(@RequestBody QuizQuestion question) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.addQuestion(question));
    }

    @PutMapping("/questions/{id}")
    public ResponseEntity<QuizQuestion> updateQuestion(
            @PathVariable Long id,
            @RequestBody QuizQuestion question) {
        return ResponseEntity.ok(quizService.updateQuestion(id, question));
    }

    @DeleteMapping("/questions/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {
        quizService.deleteQuestion(id);
        return ResponseEntity.ok("Question deleted successfully.");
    }

    @PostMapping("/submit")
    public ResponseEntity<QuizResult> submitQuiz(
            @RequestParam Long userId,
            @RequestBody Map<Long, String> answers) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.submitQuiz(userId, answers));
    }

    @GetMapping("/results/{userId}")
    public ResponseEntity<List<QuizResult>> getResultsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(quizService.getResultsByUser(userId));
    }

    @GetMapping("/result/{resultId}")
    public ResponseEntity<QuizResult> getResultById(@PathVariable Long resultId) {
        return ResponseEntity.ok(quizService.getResultById(resultId));
    }
}