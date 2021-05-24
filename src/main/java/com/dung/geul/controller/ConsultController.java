package com.dung.geul.controller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.querydsl.QPageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@RequiredArgsConstructor
@Controller

public class ConsultController {

    private final ConsultService consultService;

    @Autowired
    MemberService memberService;


    @GetMapping("/counseling/counseling")
    public void coun(){
    }

    @GetMapping("/counseling/studentcoun")
    public void stu(){
    }

    @GetMapping("/counseling/list")
    public void list(PageRequestDTO pageRequestDTO, Model model){
        log.info("list---------"+ pageRequestDTO);
        model.addAttribute("result",consultService.getList(pageRequestDTO));
    }

    @GetMapping("/counseling/register")
    public void reg(Model model){
        model.addAttribute("detail", consultService);
    }
}
