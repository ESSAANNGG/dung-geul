package com.dung.geul.controller;

import com.dung.geul.dto.AllowEtpDTO;
import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.ConsultServiceImpl;
import com.dung.geul.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
@RequestMapping("/admin")
@Log4j2
@RequiredArgsConstructor
public class AdminconsultController {
    private final ConsultService consultService;
    private final ConsultServiceImpl consultServiceimpl;
    @Autowired
    private MemberServiceImpl memberService;

        @GetMapping("/admin_consult")
        public void list (PageRequestDTO pageRequestDTO, Model model) {

            PageResultDTO<ConsultDTO, Consult> getlist = consultService.getList(pageRequestDTO);

            model.addAttribute("counselorList", memberService.findByType("COUNSELOR"));

            model.addAttribute("consultlist", getlist.getDtoList());

            log.info("counselorList : " + memberService.findByType("COUNSELOR"));
        }


        @GetMapping("/admin_consult_Reg")
        public void reg(Model modle){
            log.info("안알랴줌");

        }


}