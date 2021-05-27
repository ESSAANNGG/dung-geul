package com.dung.geul.controller;

import com.dung.geul.dto.AllowEtpDTO;
import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.MemberServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/admin")
@Log4j2
@RequiredArgsConstructor
public class AdminconsultController {
    private final ConsultService consultService;
//    private final ConsultDTO consultDTO;

    @Autowired
    private MemberServiceImpl memberService;

        @GetMapping("/admin_consult")
        public void list (PageRequestDTO pageRequestDTO, Model model) {

            PageResultDTO<ConsultDTO, Consult> getlist = consultService.getList(pageRequestDTO);

            model.addAttribute("counselorList", memberService.findByType("COUNSELOR"));
            model.addAttribute("consultlist", getlist.getDtoList());

            log.info("counselorList : " + memberService.findByType("COUNSELOR"));

        }
        @PostMapping("/admin_consult")
        public String reg (ConsultDTO consultDTO, RedirectAttributes redirectAttributes){

            log.info("dto" + consultDTO);
            Long cno = consultService.register(consultDTO);
            redirectAttributes.addAttribute("msg", cno);

            return "redirect:/admin/admin_consult";
        }
}
