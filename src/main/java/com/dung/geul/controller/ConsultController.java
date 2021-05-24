package com.dung.geul.controller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Log4j2
@RequiredArgsConstructor
@Controller

public class ConsultController {

    private final ConsultService consultService;


    @GetMapping("/counseling/counseling")
    public void coun(){
    }

    @GetMapping("/counseling/studentcoun")
    public void stu(){
    }
//
//    @GetMapping("/counseling/list")
//    public void list(PageRequestDTO pageRequestDTO, Model model){
//        log.info("list---------"+ pageRequestDTO);
//        model.addAttribute("result",consultService.getList(pageRequestDTO));
//    }
//
//    @GetMapping("/admin/admin_consult")
//    public String reg(ConsultDTO consultDTO, RedirectAttributes redirectAttributes){
//        log.info("dto" + consultDTO);
//        Long cno = consultService.register(consultDTO);
//        redirectAttributes.addFlashAttribute("msg",cno);
//
//        return "redirect:/admin/admin_consult";
//    }
}
