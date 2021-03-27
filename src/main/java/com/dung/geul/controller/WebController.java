package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/", ""})
    public String index(){
        return "/main/index";
    }

//    @GetMapping("/error")
//    public void error(){}



}
