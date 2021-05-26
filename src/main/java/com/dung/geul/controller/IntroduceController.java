package com.dung.geul.controller;


import com.dung.geul.dto.*;
import com.dung.geul.entity.Introduce;
import com.dung.geul.entity.Member;
import com.dung.geul.security.dto.AuthMemberDTO;

import com.dung.geul.service.IntroduceService;
import com.dung.geul.service.MemberService;
import com.dung.geul.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @Autowired
    MemberServiceImpl memberServiceImpl;

    //자기소개서리스트
    @GetMapping("/list")
    public void list(PageRequestDTO pageRequestDTO, Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO) {

        PageResultDTO pageResultDTO = service.getList(pageRequestDTO, authMemberDTO.getUser_id());

        model.addAttribute("result", pageResultDTO);

        System.out.println(pageResultDTO.toString());


    }

    //자기소개서등록이동
    @GetMapping("/register")
    public void register(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {

        Member member = memberServiceImpl.getMember(authMemberDTO.getUser_id());

        model.addAttribute("memberDTO", member);

    }

    //자기소개서상세페이지
    @GetMapping("/read")
    public void read(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model) {
        //@ModelAttribute는 클라이언트가 전송하는 여러 파라미터들을 1대1로 객체에 바인딩하여 다시 View로 넘겨서 출력하기 위해 사용되는 오브젝트이다.

        log.info("num :" +num);

        IntroduceDTO dto = service.read(num);

        model.addAttribute("dto", dto);
    }
    
    //자기소개서수정이동
    @GetMapping("/modify")
    public void modify(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, @AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        log.info("num :" +num);

        Member member = memberServiceImpl.getMember(authMemberDTO.getUser_id());

        IntroduceDTO dto = service.read(num);

        model.addAttribute("memberDTO", member);
        model.addAttribute("dto", dto);
    }
}
