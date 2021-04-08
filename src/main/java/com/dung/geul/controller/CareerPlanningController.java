package com.dung.geul.controller;

import com.dung.geul.security.dto.AuthMemberDTO;
import org.dom4j.rule.Mode;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/career-planning")

public class CareerPlanningController {

    @GetMapping("/simli_test")  // 심리 검사
    public String simli_test(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "career-planning/simli_test";}

}
