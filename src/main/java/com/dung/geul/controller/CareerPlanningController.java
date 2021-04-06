package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/career-planning")

public class CareerPlanningController {

    @GetMapping("/simli_test")
    public String simli_test() { return "career-planning/simli_test";}
}
