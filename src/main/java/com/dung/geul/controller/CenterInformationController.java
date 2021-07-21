package com.dung.geul.controller;


import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;
import com.dung.geul.repository.BoardRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.notice_boardService;
import com.dung.geul.service.notice_boardServiceImpl;
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

@Controller
@RequestMapping("/center-information")
@RequiredArgsConstructor    // 페이지 목록 처리
@Log4j2
public class CenterInformationController {  // 센터정보 컨트롤러

    @Autowired
    notice_boardServiceImpl boardservice;

    @GetMapping("/center_introduction")   // 센터 소개
    public String center_introduction(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/center_introduction"; }

    @GetMapping("/main_business")   // 주요 업무
    public String main_business(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/main_business";
    }


// 공지사항 게시판 =======================================================================================================

    @GetMapping("/notice_board_form")   // 공지 사항 작성 페이지
    public String notice_board_form(@AuthenticationPrincipal AuthMemberDTO authMemberDTO, Model model) {
        model.addAttribute("loginUser", authMemberDTO);
        return "center-information/notice_board_form"; }

    private final notice_boardService service;

    @Autowired
    private BoardRepository repository;

    @GetMapping("/notice_board")    // 공지사항 게시판 페이지
    public String notice_board(PageRequestDTO pageRequestDTO, Model model) {

        log.info("list............." + pageRequestDTO);

        // PageResultDTO
        model.addAttribute("result", service.getList(pageRequestDTO));
        return "center-information/notice_board";
    }

    @GetMapping("/notice_board_register")
    public void register() {    // 공지사항 게시판 작성 GET
        log.info("REGISTER GET...");
    }

    @PostMapping("/notice_board_register")  // 공지사항 게시판 작성 POST
    public String registerPost(notice_boardDTO dto, RedirectAttributes redirectAttributes){

        log.info("dto..." + dto);

        //새로 추가된 엔티티의 번호
        Long num = service.register(dto);

        redirectAttributes.addFlashAttribute("msg", num);

        return "redirect:/center-information/notice_board"; // 작성이 끝나면 게시판 관리 페이지로 redurect 해준다
    }

    @GetMapping({"/notice_board_read", "/notice_board_modify"}) // 매핑을 배열로 두개 처리
    public void read(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                     Model model){

        log.info("num: " + num);

        notice_boardDTO dto = service.read(num);

        model.addAttribute("dto", dto);

    }

    @PostMapping("/remove")
    public String remove(long num, RedirectAttributes redirectAttributes){  // 게시글 삭제

        log.info("num: " + num);

        service.remove(num);

        redirectAttributes.addFlashAttribute("msg", num);

        return "redirect:/center-information/notice_board";

    }

    @PostMapping("/notice_board_modify")
    public String modify(notice_boardDTO dto,
                         @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                         RedirectAttributes redirectAttributes){    // 게시글 수정

        log.info("post modify.........................................");
        log.info("dto: " + dto);

        service.modify(dto);

        redirectAttributes.addAttribute("page",requestDTO.getPage());
        redirectAttributes.addAttribute("num",dto.getNum());


        return "redirect:/center-information/notice_board_read";
    }

    //지민우
    @PostMapping("/admin_board_modify")
    public String adminModify(notice_boardDTO dto,
                         @ModelAttribute("requestDTO") PageRequestDTO requestDTO,
                         RedirectAttributes redirectAttributes){    // 게시글 수정

        log.info("post modify.........................................");
        log.info("dto: " + dto);

        service.modify(dto);

        redirectAttributes.addAttribute("page",requestDTO.getPage());
        redirectAttributes.addAttribute("num",dto.getNum());


        return "redirect:/admin/admin_board?";
    }


    // 게시판 모달에 띄우기
    @GetMapping("/detail/read")
    public ResponseEntity memberDetailsRead(@RequestParam("board_num") Long board_num){

        notice_boardDTO board = boardservice.read(board_num);
        log.info(board.toString());
        return new ResponseEntity(board, HttpStatus.OK);
    }
}
