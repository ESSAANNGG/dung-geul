package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/license")
public class LicenseController {

    @GetMapping("/list")
    public void getList(){
    }

    @GetMapping("/register")
    public void getRegister(){
    }

    @GetMapping("/modify")
    public void getModify(){
    }
}
