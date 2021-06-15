package com.dung.geul.controller;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.LicenseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Log4j2
@Controller
@RequestMapping("/license")
public class LicenseController {

    @Autowired
    private LicenseService licenseService;

    @GetMapping("/list")
    public void getList(PageRequestDTO pageRequestDTO,
                        @AuthenticationPrincipal AuthMemberDTO authMemberDTO,
                        Model model){
        String user_id = authMemberDTO.getUser_id();

        log.info("list 시작 - user_id : " + user_id);

        PageResultDTO resultDTO = licenseService.getLicensePage(user_id, pageRequestDTO);

        log.info("PageResultDTO : " + resultDTO);

        model.addAttribute("page", resultDTO);

    }

    @GetMapping("/register")
    public void getRegister(){
    }

    @GetMapping("/modify")
    public void getModify(){
    }
}
