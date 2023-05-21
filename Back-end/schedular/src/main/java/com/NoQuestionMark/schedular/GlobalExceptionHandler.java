package com.NoQuestionMark.schedular;

import com.NoQuestionMark.schedular.exception.ScheduleException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ScheduleException.class)
    public ResponseEntity<String> handleMyException(ScheduleException ex) {
        String errorMessage = ex.getErrorCode().getMessage();
        HttpStatus status = ex.getErrorCode().getStatus();
        return new ResponseEntity<>(errorMessage, status);
    }
}
