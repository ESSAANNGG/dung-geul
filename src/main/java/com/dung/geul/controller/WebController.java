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
                return  "main/index";
            }
            return "main/index";
        } catch (Exception e){
            System.out.println(e.getMessage());
            return "main/index";
        }

    }



//    @GetMapping("/counseling/counseling")
//    public void coun(){
//    }
//
//    @GetMapping("/counseling/studentcoun")
//    public void stu(){
//    }

    @GetMapping("/upgrade/upgrade")
    public void cprogram(){
    }
    @GetMapping("/upgrade/c-inpression")
    public void cinpression(){
    }

    @GetMapping("/upgrade/impression-write")
    public void cimpression(){
    }

}
