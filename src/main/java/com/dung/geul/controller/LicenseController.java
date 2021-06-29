package com.dung.geul.controller;

import com.dung.geul.dto.CertificateDTO;
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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

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

        model.addAttribute("result", resultDTO);


    }

    @GetMapping("/register")
    public void getRegister(@AuthenticationPrincipal AuthMemberDTO member,
                            Model model){
        model.addAttribute("user_id", member.getUser_id());
    }

    @PostMapping("/register")
    public String postRegister(CertificateDTO certificateDTO){

        licenseService.register(certificateDTO);

        return "redirect:/license/list";
    }

    @GetMapping("/modify")
    public void getModify(@RequestParam("num") String lic_num,
                          @RequestParam("page") int page,
                          Model model){

        CertificateDTO dto = licenseService.getCertificateDTO(lic_num);

        model.addAttribute("dto", dto);
        model.addAttribute("page", page);

    }

    @PostMapping("/modify")
    public String postModify(RedirectAttributes redirect,
                             @RequestParam("page") int page,
                             CertificateDTO certificateDTO){

        log.info("modify 실행 - certificateDTO : " + certificateDTO);
        licenseService.modifyLicense(certificateDTO);

        redirect.addAttribute("page", page);

        return "redirect:/license/list";
    }

    @GetMapping("/delete")
    public String delete(@RequestParam("num") String lic_num){

        log.info("lic_num : " + lic_num);

        licenseService.deleteLicense(lic_num);

        return "redirect:/license/list";
    }
}
