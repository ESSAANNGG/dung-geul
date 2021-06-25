package com.dung.geul.controller;

import com.dung.geul.dto.*;
import com.dung.geul.dto.cv.CvPageDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.repository.MemberRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

    @Autowired
    private IntroduceService service;

    @Autowired
    private ApplicationService applicationService;


    // 이력서

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


    // 자소서

    //자기소개서리스트
    @GetMapping("/introduce/list")
    public void list(PageRequestDTO pageRequestDTO, Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO) {

        PageResultDTO pageResultDTO = service.getList(pageRequestDTO, authMemberDTO.getUser_id());

        model.addAttribute("result", pageResultDTO);

        System.out.println(pageResultDTO.toString());


    }

    //자기소개서등록이동
    @GetMapping("/introduce/register")
    public void register(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {

        Member member = memberService.getMember(authMemberDTO.getUser_id());

        model.addAttribute("memberDTO", member);

    }

    //자기소개서상세페이지
    @GetMapping("/introduce/read")
    public void read(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model) {
        //@ModelAttribute는 클라이언트가 전송하는 여러 파라미터들을 1대1로 객체에 바인딩하여 다시 View로 넘겨서 출력하기 위해 사용되는 오브젝트이다.

        log.info("num :" +num);

        IntroduceDTO dto = service.read(num);

        model.addAttribute("dto", dto);
    }

    //자기소개서수정이동
    @GetMapping("/introduce/modify")
    public void modify(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, @AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        log.info("num :" +num);

        Member member = memberService.getMember(authMemberDTO.getUser_id());

        IntroduceDTO dto = service.read(num);

        model.addAttribute("memberDTO", member);
        model.addAttribute("dto", dto);
    }


}
