package com.dung.geul.controller;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.dto.EducationDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.Education;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.repository.EducationRepository;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.tags.EditorAwareTag;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/application")
@Log4j2
public class ApplicationController {
    // 이력서 자소서 관련 컨트롤러

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private CvServiceImpl cvService;

    @Autowired
    private LicenseService licenseService;

    @GetMapping("/cv/before")
    public String cvBefore(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        System.out.println("cv before 실행");

        String result = "application/cv/before";

        Member member = memberRepository.findById(authMemberDTO.getUser_id()).get();

        Optional<CV> cv = cvRepository.findByUser_id(member);

        model.addAttribute("loginUser", authMemberDTO);

        if(!cv.isEmpty()){
            result = "redirect:/application/cv/read";
        }

        System.out.println("result : " + result);

        return result;
    }

    @GetMapping("/cv/register")
    public void register(Model model,
                           @AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        String id = authMemberDTO.getUser_id();
        Member member = memberService.getMember(id);
        List<CertificateDTO> certificateDTOList = licenseService.getLicenseList(id);

        model.addAttribute("loginUser", member);
        model.addAttribute("licenseList", certificateDTOList);

    }

    @GetMapping({"/cv/read", "/cv/modify"})
    public void read(Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        String id = authMemberDTO.getUser_id();

        CvPageDTO cv = cvService.getCvPageDto(id);
        List<CertificateDTO> certificateDTOList = licenseService.getLicenseList(id);

        model.addAttribute("cv", cv);
        model.addAttribute("loginUser", authMemberDTO);
        model.addAttribute("licenseList" , certificateDTOList);

    }


}
