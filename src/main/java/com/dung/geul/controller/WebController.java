package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class WebController {

    @GetMapping({"/", ""})
    public String index(Principal member){

        try {
            if (member.getName().equals("admin")) {
                return "/admin/admin_userManage";
            }
            return "main/index";
        } catch (Exception e){
            System.out.println(e.getMessage());
            return "main/index";
        }

    }

    @GetMapping("/job-information/job-information")
    public void jobInfo(){
    }

//    @GetMapping("/counseling/counseling")
//    public void coun(){
//    }
//
//    @GetMapping("/counseling/studentcoun")
//    public void stu(){
//    }
    @GetMapping("/job-information/job-dictionary")
    public void dict(){
    }
    @GetMapping("/upgrade/upgrade")
    public void cprogram(){
    }
    @GetMapping("/upgrade/c-inpression")
    public void cimpression(){
    }

}
