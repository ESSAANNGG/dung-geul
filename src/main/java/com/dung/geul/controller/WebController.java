package com.dung.geul.controller;

import com.dung.geul.security.dto.AuthMemberDTO;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping({"/", ""})
    public String index(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        model.addAttribute("loginUser", authMemberDTO);

        System.out.print("authMemberDTO : " + authMemberDTO);

        return "/main/index";


    }

}
