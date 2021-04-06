package com.dung.geul.controller;


import com.dung.geul.entity.Board;
import com.dung.geul.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequestMapping("/center-information")
public class Center_information_controller {

    @GetMapping("/center_introduction")
    public String center_introduction() { return "center-information/center_introduction"; }

    @GetMapping("/main_business")
    public String main_business() { return "center-information/main_business"; }

    @GetMapping("/notice_board_form")
    public String notice_board_form() { return "center-information/notice_board_form"; }

//// test ------------------------------------------------------------------------------------------------------------------

    @Autowired  // dependence 인잭션 발생 => 서버 기동 시 인스턴스가 들어온다.
    private BoardRepository boardRepository;    // 보드레포지토리 인터페이스를 사용하기 위한 변수 => 테이블의 데이터를 가져와서 사용하기 위한 변수

    @GetMapping("/notice_board")
    public String notice_board(Model model) {
        List<Board> boards = boardRepository.findAll(); // DB의 데이터를 모두 불러온다
        model.addAttribute("boards", boards);  //(key, value)

        return "center-information/notice_board";
    }

// ------------------------------------------------------------------------------------------------------------------


}
