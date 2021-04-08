package com.dung.geul.controller;

import com.dung.geul.security.dto.AuthMemberDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MemberController {

    // 로그인

    @GetMapping("/login")
    public String login(){
        return "login/login";
    }


    //회원가입

    @GetMapping("/sign-up")
    public String signUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/user_classification";
    }

    @GetMapping("/school-user_category")
    public String signUpSchoolUserCategory(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        model.addAttribute("loginUser", authMemberDTO);

        return "sign-up/school-user_category";
    }

    @GetMapping("/student_sign-up")
    public String studentSignUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/student_sign-up";
    }

    @GetMapping("/professor_sign-up")
    public String professorSignUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/professor_sign-up";
    }

    @GetMapping("/mentor_sign-up")
    public String mentorSignUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/mentor_sign-up";
    }

    @GetMapping("/enterprise_sign-up")
    public String enterpriseSignUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/enterprise_sign-up";
    }

    @GetMapping("/counselor_sign-up")
    public String counselorSignUp(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "sign-up/counselor_sign-up";
    }

    @GetMapping("/forgot_find")
    public String forgot(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        model.addAttribute("loginUser", authMemberDTO);
        return "forgot/forgot";
    }

}
