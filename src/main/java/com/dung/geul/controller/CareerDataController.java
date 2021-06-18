package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/career_data")

public class CareerDataController {
    @GetMapping("/cv_strategy")
    public String cv_strategy() {
        return "career_data/cv_strategy";
    }
    @GetMapping("/interview_strategy")
    public String interview_strategy() { return "career_data/interview_strategy"; }
    @GetMapping("/intro_strategy")
    public String intro_strategy() {
        return "career_data/intro_strategy";
    }


}
