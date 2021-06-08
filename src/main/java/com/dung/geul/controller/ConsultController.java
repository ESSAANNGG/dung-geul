package com.dung.geul.controller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Member;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.MemberService;
import com.dung.geul.service.MemberServiceImpl;
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
    MemberServiceImpl memberService;


    @GetMapping("/counseling/intro")
    public void intro(){
    }

    @GetMapping("/counseling/counseling")
    public void coun(PageRequestDTO pageRequestDTO,@AuthenticationPrincipal AuthMemberDTO authMemberDTO,Model model){

        Member member = memberService.getMember(authMemberDTO.getUser_id());

        log.info("상담 등록끌어오기");
        log.info("현재 회원 정보" + member);
        PageResultDTO<ConsultDTO, Consult> list = consultService.getList(pageRequestDTO);
        model.addAttribute("list",list.getDtoList());
        model.addAttribute("loginUser", member);

    }

    @GetMapping("/counseling/studentcoun")
    public void stu(){
    }
//    @GetMapping("/counseling/list")
//    public void list(PageRequestDTO pageRequestDTO, Model model){
//        log.info("list---------"+ pageRequestDTO);
//        model.addAttribute("result",consultService.getList(pageRequestDTO));
//    }

}
