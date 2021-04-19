package com.dung.geul.controller;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.service.MemberServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("/allow")
@Controller
public class AllowController {

    @Autowired
    private MemberServiceImpl memberService;

    @GetMapping("/etp/list")
    public void list(PageRequestDTO pageRequestDTO, Model model){
        //파라미터로 page, size 를 전달하면 자동으로 pageRequestDTO 객체로 수집된다

        System.out.println("list 컨트롤러 실행");

        model.addAttribute("list", memberService.getList(pageRequestDTO));

    }

    @GetMapping("/etp/read")
    public void read(@RequestParam("user_id") String user_id, Model model){

        EnterpriseDTO etpDTO = memberService.getEnterprise(user_id);
    }
}
