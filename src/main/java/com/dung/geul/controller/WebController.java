package com.dung.geul.controller;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.service.EmployService;
import com.dung.geul.service.notice_boardService;
import com.dung.geul.service.notice_boardServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
@RequiredArgsConstructor    // 페이지 목록 처리
@Log4j2
public class WebController {

    @Autowired
    notice_boardServiceImpl boardservice;
    private final notice_boardService service;

    @Autowired
    private EmployService Eservice;

    @GetMapping({"/", ""})
    public String index(Principal member, PageRequestDTO pageRequestDTO, Model model){

        model.addAttribute("result", service.getList(pageRequestDTO));
        model.addAttribute("Eresult", Eservice.getList(pageRequestDTO));

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
