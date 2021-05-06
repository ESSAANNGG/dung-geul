package com.dung.geul.controller;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.service.ConsultService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@RequiredArgsConstructor
@RequestMapping("/counseling/")
@Controller

public class ConsultController {

    private final ConsultService consultService;

    @GetMapping("/list")
    public void list(PageRequestDTO pageRequestDTO, Model model){
        model.addAttribute("result", consultService.getList(pageRequestDTO));
    }
    @GetMapping("/counseling")
    public void coun(){
    }

    @GetMapping("/studentcoun")
    public void stu(){
    }

    @GetMapping("/register")
    public String register(Model model){
        model.addAttribute("consultform",new ConsultForm());
        return "counseling/register";
    }

}
