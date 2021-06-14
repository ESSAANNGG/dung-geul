package com.dung.geul.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

//@ControllerAdvice("com.dung.geul.controller")// 해당 패키지 내 모든 에러를 처리!
public class ExceptionController {
    // 에러 전역 처리

//
//    @ResponseStatus(HttpStatus.NOT_FOUND) // 404
//    @ExceptionHandler(IllegalArgumentException.class) // 해당 예외 발생 시, 수행!
//    public String notFound(Exception exception, Model model) {
//        model.addAttribute("exception", exception);
//        return "error/404"; // 해당 페이지를 보여 줌!
//    }
//
//    @ResponseStatus(HttpStatus.FORBIDDEN) // 403
//    @ExceptionHandler(DataIntegrityViolationException.class)
//    public String forbidden() {
//        return "error/403";
//    }
//
//    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // 500
//    @ExceptionHandler({NullPointerException.class, ClassNotFoundException.class, IndexOutOfBoundsException.class})
//    public String serverError() {
//        return "error/500";
//    }
}
