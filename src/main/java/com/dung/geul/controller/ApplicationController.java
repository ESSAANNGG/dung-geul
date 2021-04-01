package com.dung.geul.controller;

import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@Controller
@RequestMapping("/application")
public class ApplicationController {
    // 이력서 자소서 관련 컨트롤러

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private MemberRepository memberRepository;


    @GetMapping("/cv/before")
    public String cvBefore(@AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        String result = "";

        Member member = memberRepository.findById(authMemberDTO.getUser_id()).get();

        Optional<CV> cv = cvRepository.findByUser_id(member);

        if(cv.isEmpty()){
            result = "/application/cv/before";
        } else {
            result = "redirect:/application/cv/read";
        }

        return result;
    }

    @GetMapping("/cv/register")
    public String register(Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        model.addAttribute("loginUser", authMemberDTO);
        model.addAttribute("loginUserAge", 24); // 24는 임시값 >> 추후 나이계산해서 수정하기

        return "/application/cv/register";

    }

    @GetMapping("/cv/read")
    public String read(Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        Member member = memberRepository.findById(authMemberDTO.getUser_id()).get();

        CV cv = cvRepository.findByUser_id(member).get();

        model.addAttribute("cv", cv);
        model.addAttribute("age", 24);  // 추후 수정

        return "/application/cv/read";
    }

    @GetMapping("/cv/modify")
    public String modify(Model model, Long cv_id){

        CV cv = cvRepository.getOne(cv_id);

        model.addAttribute("cv", cv);

        model.addAttribute("age", 24); // 24는 임시값 >> 추후 나이계산해서 수정하기

        return "/application/cv/modify";
    }


}
