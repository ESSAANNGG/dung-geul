package com.dung.geul.handler;

import com.dung.geul.dto.JoinResultPageDTO;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ExceptionHandler(value = Exception.class)
    public JoinResultPageDTO<String> HandleException(Exception e){

        return new JoinResultPageDTO<String>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value());
    }
}
