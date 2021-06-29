package com.dung.geul.controller;

import com.dung.geul.dto.*;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.ApplicationService;
import com.dung.geul.service.ConsultingService;
import com.dung.geul.service.EmployService;
import com.dung.geul.service.MemberServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Log4j2
@Controller
@RequestMapping("/mypage")
public class MyPageController {        // 마이페이지 관련 컨트롤러

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private ConsultingService consultingService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private EmployService employService;
    // member 교내회원 마이페이지 (학생-STUDENT, 상담사-COUNSELOR, 관리자-ADMIN)
    // 매핑 기본 주소 : /mypage/

    @GetMapping("/before/read")
    public String mypageBeforeRead(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        if(authMemberDTO.getUser_id().equals("admin")){
            return "redirect:/admin/admin";
        }
        if(authMemberDTO.getUser_type().equals("ENTERPRISE")){
            return "redirect:/mypage/etp/read";
        }
        else if (authMemberDTO.getUser_type().equals("COUNSELOR")) {
            return "redirect:/mypage/consult/read";
        }
        else {
            return "redirect:/mypage/member/read";
        }

    }

    @GetMapping("/before/modify")
    public String mypageBeforeModify(@AuthenticationPrincipal AuthMemberDTO authMemberDTO){
        if(authMemberDTO.getUser_type().equals("ENTERPRISE")){
            return "redirect:/mypage/etp/modify";
        } else {
            return "redirect:/mypage/member/modify";
        }
    }

    @GetMapping({"/member/read", "/member/modify"})
    public void mypageRead(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        Member member = memberService.getMember(authMemberDTO.getUser_id());

        model.addAttribute("memberDTO", member);

        Set<String> roles = new HashSet<>();

        // role에
        if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_STUDENT")))
            roles.add("STUDENT");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MENTO")))
            roles.add("MENTO");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_COUNSELOR")))
            roles.add("COUNSELOR");


        System.out.println(roles.contains("STUDENT"));

        model.addAttribute("roles", roles);

        model.addAttribute("loginUser", authMemberDTO);

    }

    // 기업회원 마이페이지
    @GetMapping({"/etp/read", "/etp/modify"})
    public void etpMypageRead(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        // user_id를 받아서 enterprise랑 member를 조인한 결과값인 enterpriseDTO를 반환
        EnterpriseDTO enterpriseDTO = memberService.getEnterprise(authMemberDTO.getUser_id());

        model.addAttribute("etp", enterpriseDTO);

        System.out.println("controller - enterpriseDTO : " + enterpriseDTO.toString());


        //지민우 //기업정보수정
        Member member = memberService.getMember(authMemberDTO.getUser_id());
        MemberDTO memberDTO = memberService.getMemberDTO(member);

        model.addAttribute("memberDTO", memberDTO);

        Set<String> roles = new HashSet<>();

        // role에
        if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_STUDENT")))
            roles.add("STUDENT");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MENTO")))
            roles.add("MENTO");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_COUNSELOR")))
            roles.add("COUNSELOR");


        System.out.println(roles.contains("STUDENT"));

        model.addAttribute("roles", roles);

        model.addAttribute("loginUser", authMemberDTO);

    }
    @GetMapping({"/consult/read"})
    public void conMypageRead(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){
        Member member = memberService.getMember(authMemberDTO.getUser_id());

        model.addAttribute("memberDTO",member);
    }

    //

    @GetMapping("/member/modifyPw")
    public void ModifyMemberPw(String user_id, Model model, @AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        System.out.println("ModifyPw() 실행 user_id : " + user_id);

        model.addAttribute("user_id", user_id);
        model.addAttribute("loginUser", authMemberDTO);
    }

    @GetMapping( "/consult/counselling_request")
    public void okey(PageRequestDTO pageRequestDTO, Model model,@AuthenticationPrincipal AuthMemberDTO authMemberDTO){
        PageResultDTO<ConsultingDTO, Consulting> getlist = consultingService.conlist(pageRequestDTO);
        System.out.println("================" + pageRequestDTO);
        model.addAttribute("conlist", getlist.getDtoList());
        model.addAttribute("loginUser", authMemberDTO);

        //지민우
        Member member = memberService.getMember(authMemberDTO.getUser_id());
        model.addAttribute("memberDTO",member);
    }

    @GetMapping("/consult/counselling_reject")
    public void reject(){
    }

    @GetMapping("/member/studentcoun")
    public void stu(PageRequestDTO pageRequestDTO, Model model,@AuthenticationPrincipal AuthMemberDTO authMemberDTO){
        PageResultDTO<ConsultingDTO, Consulting> getlist = consultingService.conlist(pageRequestDTO);
        System.out.println("===내 목록 확인하기===");
        model.addAttribute("mylist", getlist.getDtoList());

        Member member = memberService.getMember(authMemberDTO.getUser_id());
        model.addAttribute("memberDTO",member);
    }


    //지민우 //상담사 수정
    @GetMapping( "/consult/modify")
    public void mypageReadConsult(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        Member member = memberService.getMember(authMemberDTO.getUser_id());

        model.addAttribute("memberDTO", member);

        Set<String> roles = new HashSet<>();

        // role에
        if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_STUDENT")))
            roles.add("STUDENT");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_MENTO")))
            roles.add("MENTO");

        else if(authMemberDTO.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_COUNSELOR")))
            roles.add("COUNSELOR");


        System.out.println(roles.contains("STUDENT"));

        model.addAttribute("roles", roles);

        model.addAttribute("loginUser", authMemberDTO);

    }

    // 입사지원

    // 학생회원 본인 입사지원 목록 반환
    @GetMapping("/member/ApplicationStatus")
    public void getStudentApplyList(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, PageRequestDTO pageRequestDTO, Model model){

        PageResultDTO pageResultDTO = applicationService.getStudentApplyListPageDTO(pageRequestDTO, authMemberDTO.getUser_id());

        model.addAttribute("result", pageResultDTO);
        model.addAttribute("member", authMemberDTO);

        log.info("getStudentList - result : " + pageResultDTO);

    }

    // 기업회원 본인 채용공고 목록 반환
    @GetMapping("/etp/employ/list")
    public void getEmployList(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model){

        List<EmployDTO> emList = employService.getListByMember(authMemberDTO.getUser_id());

        model.addAttribute("emList", emList);
        model.addAttribute("memberDTO", authMemberDTO);

        log.info("채용공고 리스트 : " + emList);
    }



}