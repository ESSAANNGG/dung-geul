package com.dung.geul.controller;

import com.dung.geul.security.dto.AuthMemberDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/", ""})
    public String index(){

        return "main/index";
    }

    @GetMapping("/job-information")
    public String jobInfo(){

        return "job-information/job-information";
    }

    @GetMapping("/counseling/counseling")
    public void coun(){
    }

    @GetMapping("/counseling/studentcoun")
    public void stu(){
    }
    @GetMapping("/job-information/job-dictionary")
    public void dict(){
    }

}
