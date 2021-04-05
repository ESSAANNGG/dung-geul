package com.dung.geul.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/center-information")
public class Center_information_controller {

    @GetMapping("/center_introduction")
    public String center_introduction() { return "center-information/center_introduction"; }

    @GetMapping("/main_business")
    public String main_business() { return "center-information/main_business"; }

    @GetMapping("/notice_board")
    public String notice_board() { return "center-information/notice_board"; }

}
