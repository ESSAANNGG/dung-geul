package com.dung.geul.controller;


import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.security.dto.AuthMemberDTO;

import com.dung.geul.service.IntroduceService;
import com.dung.geul.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@RequestMapping("/Introduce")
@Controller
@RequiredArgsConstructor
public class IntroduceController {

    @Autowired
    private IntroduceService service;

    @Autowired
    MemberService memberService;

    //자기소개서리스트
    @GetMapping("/list")
    public void list(PageRequestDTO pageRequestDTO, Model model) {

        model.addAttribute("result", service.getList(pageRequestDTO));
    }

    //자기소개서등록이동
    @GetMapping("/register")
    public void register(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        IntroduceDTO introduceDTO = memberService.getIntroduce(authMemberDTO.getUser_id());

        model.addAttribute("introduce", introduceDTO);
    }

    //자기소개서수정이동
    @GetMapping("/modify")
    public void modify(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, @AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        log.info("num :" +num);

        IntroduceDTO introduceDTO = memberService.getIntroduce(authMemberDTO.getUser_id());

        IntroduceDTO dto = service.read(num);

        model.addAttribute("introduce", introduceDTO);
        model.addAttribute("dto", dto);
    }
}
