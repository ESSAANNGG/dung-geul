package com.dung.geul.controller;

import com.dung.geul.dto.*;
import com.dung.geul.service.EmployService;
import com.dung.geul.service.MemberServiceImpl;
import com.dung.geul.service.notice_boardService;
import com.querydsl.core.BooleanBuilder;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RequestMapping("/admin")
@Controller
@Log4j2
public class AdminPageController {

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

    @GetMapping("/admin_dashboard") // 관리자 페이지.대쉬보드
    public void emf(){

    }

    private notice_boardService service;  // 공지사항 게시판 Service

    // 생성자(공지사항 게시판 글을 불러온다.)
    // 클라 -> DTO -> Service
    public AdminPageController(notice_boardService service) {
        this.service = service;
    }

    @GetMapping("/admin_board") // 관리자 페이지.게시판 관리
    public void emg(PageRequestDTO pageRequestDTO, Model model){

        log.info("list............." + pageRequestDTO);

        // PageResultDTO
        // : 공지사항 게시판의 글을 불러와 관리자 페이지의 (공지사항)게시판 관리에 보여준다.
        model.addAttribute("result", service.getList(pageRequestDTO));
    }

    @GetMapping("/admin_application")   // 관리자 페이지.입사지원
    public void application(){

    }

    @GetMapping("/admin_supportProgram")    // 관리자 페이지.지원 프로그램
    public void applicationd(){

    }

    @GetMapping("/admin_supportProgram_Reg")
    public void applicationdR(){

    }


}
