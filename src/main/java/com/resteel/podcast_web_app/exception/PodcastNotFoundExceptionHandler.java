package com.resteel.podcast_web_app.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class PodcastNotFoundExceptionHandler {
    @ExceptionHandler(PodcastNotFoundException.class)
    public ResponseEntity<String> PodcastNotFoundExceptionHandler(Exception ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
