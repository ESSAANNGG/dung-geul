package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/career-planning")

public class CareerPlanningController {

    @GetMapping("/simli_test")  // 심리 검사
    public String simli_test() { return "career-planning/simli_test";}

    @GetMapping("job_info")  // 직업정보 조회
    public String job_info() { return "career-planning/job_info";}


}
