package com.dung.geul.controller;

import com.dung.geul.dto.*;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Member;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.EmployService;
import com.dung.geul.service.MemberServiceImpl;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.log4j.Log4j;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.view.RedirectView;

import java.time.LocalDate;
import java.util.List;
import java.util.Locale;


@RequestMapping("/admin")
@Controller
@Log4j2
public class AllowController {

    @Autowired
    private MemberServiceImpl memberService;

    @Autowired
    private EmployService employservice;

    // 전체 회원 인증 리스트 페이지
    @GetMapping("/admin_userManage")
    public void getList(Model model,
                        @RequestParam(value = "page1", required = false, defaultValue = "1") int page1,
                        @RequestParam(value = "page2", required = false, defaultValue = "1") int page2,
                        SearchDTO searchDTO
    ){

        // type : USER / ENTERPRISE / STUDENT / STAFF / COUNSELOR / UNIV
        System.out.println("page1 : " + page1 +"\n" +
                "page2 : " + page2);
        System.out.println("list 컨트롤러 실행");

        System.out.println("shape : " + searchDTO.getShape());

        // allow = 0, page1 : 미인증 목록
        // allow = 1, page2 : 인증 목록

        PageRequestDTO NotAllowPageDTO = new PageRequestDTO(page1);
        PageRequestDTO AllowPageDTO = new PageRequestDTO(page2);

        BooleanBuilder NotAllowBuilder = memberService.findByAllowUser(searchDTO, 0);
        BooleanBuilder AllowBuilder = memberService.findByAllowUser(searchDTO, 1);

        log.info("booleanBuilder - notAllowBuilder : " + NotAllowBuilder.getValue());
        log.info("booleanBuilder - allowBuilder : " + AllowBuilder.getValue());

        Sort sort = Sort.by("user_regdate");

        PageResultDTO notAllowDto = memberService.getPageResultDTO(NotAllowBuilder, NotAllowPageDTO.getPageable(sort));
        PageResultDTO allowDto = memberService.getPageResultDTO(AllowBuilder, AllowPageDTO.getPageable(sort));

        model.addAttribute("notAllowList", notAllowDto.getDtoList());
        model.addAttribute("allowList", allowDto.getDtoList());

        log.info("notAllowList : " + notAllowDto.getDtoList());
        log.info("allowList : " + allowDto.getDtoList());
    }


    @GetMapping("/member/read")
    public EnterpriseDTO read(@RequestParam("user_id") String user_id){

        return memberService.getEnterprise(user_id);
    }


    @GetMapping("/admin_employ")
        public void list(PageRequestDTO pageRequestDTO, Model model) {

            model.addAttribute("result", employservice.getList(pageRequestDTO));

    }

    @GetMapping("/admin_dashboard")
    public void emf(){

    }

    @GetMapping("/admin_board")
    public void emg(){

    }

    @GetMapping("/admin_application")
    public void application(){

    }

    @GetMapping("/admin_supportProgram")
    public void applicationd(){

    }

    @GetMapping("/admin_supportProgram_Reg")
    public void applicationdR(){

    }


}
