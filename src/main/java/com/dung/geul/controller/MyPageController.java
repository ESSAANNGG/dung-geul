package com.dung.geul.controller;

import com.dung.geul.dto.MemberDTO;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.MemberServiceImpl;
import com.dung.geul.service.MyPageServiceImpl;
import org.dom4j.rule.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashSet;
import java.util.Set;

@Controller
@RequestMapping("/mypage")
public class MyPageController {        // 마이페이지 관련 컨트롤러

    @Autowired
    private MyPageServiceImpl myPageServiceImpl;

    @Autowired
    private MemberServiceImpl memberService;


    // member 교내회원 마이페이지 (학생-STUDENT, 멘토-MENTO, 상담사-COUNSELOR, 관리자-ADMIN)
    // 매핑 기본 주소 : /mypage/member

    @GetMapping({"/member/read", "/member/modify"})
    public void mypageRead(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        System.out.println("authMemberDTO : " + authMemberDTO.toString());

        model.addAttribute("memberDTO", authMemberDTO);

        Set<String> roles = new HashSet<>();

        // role에
        if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_STUDENT")))
            roles.add("STUDENT");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MENTO")))
            roles.add("MENTO");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_COUNSELOR")))
            roles.add("COUNSELOR");


        model.addAttribute("roles", roles);

    }

    @GetMapping("/mypage/member/modifyPw/{user_id}")
    public String ModifyPw(@PathVariable(name = "user_id") String user_id, Model model){

        System.out.println("pwModifyPageRead() 실행 user_id : " + user_id);

        model.addAttribute("user_id", user_id);

        return "/member/modify_pw";
    }

}
