package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/job-information")
public class JobInformationController {

    @GetMapping("/job-information") // 직업 정보
    public void jobInfo(){
    }

    @GetMapping("/job-dictionary")  // 직업 사전
    public void dict(){
    }

    @GetMapping("/jobSerchK")   // 키워드 검색
    public String jobSerchK() {

        return "";
    }


}
