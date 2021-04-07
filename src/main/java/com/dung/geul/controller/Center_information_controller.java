package com.dung.geul.controller;


import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.entity.Board;
import com.dung.geul.repository.BoardRepository;
import com.dung.geul.service.notice_boardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.awt.print.Pageable;
import java.util.List;

@Controller
@RequestMapping("/center-information")
@RequiredArgsConstructor    // 페이지 목록 처리
@Log4j2
public class Center_information_controller {

    @GetMapping("/center_introduction")   // 센터 소개
    public String center_introduction() { return "center-information/center_introduction"; }

    @GetMapping("/main_business")   // 주요 업무
    public String main_business() { return "center-information/main_business"; }

    @GetMapping("/notice_board_form")   // 공지 사항 작성 페이지
    public String notice_board_form() { return "center-information/notice_board_form"; }

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


// ------------------------------------------------------------------------------------------------------------------


}
