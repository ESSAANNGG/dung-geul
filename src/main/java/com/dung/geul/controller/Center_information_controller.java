package com.dung.geul.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/center-information")
public class Center_information_controller {

    @GetMapping("/center_introduction")   // 센터 소개
    public String center_introduction() { return "center-information/center_introduction"; }

    @GetMapping("/main_business")   // 주요 업무
    public String main_business() { return "center-information/main_business"; }

    @GetMapping("/notice_board_form")   // 공지 사항 작성 페이지
    public String notice_board_form() { return "center-information/notice_board_form"; }


    @GetMapping("/notice_board")
    public String notice_board() {

        return "center-information/notice_board";
    }

// ------------------------------------------------------------------------------------------------------------------


}
