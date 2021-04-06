package com.dung.geul.controller;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.service.EmployService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Log4j2
@RequestMapping("/Employ")
@Controller
public class EmpolyController {

    @Autowired
    private EmployService service;

    @GetMapping("/list")
    public void list(PageRequestDTO pageRequestDTO, Model model) {

        model.addAttribute("result", service.getList(pageRequestDTO));
    }

    @GetMapping("/read")
    public void read(long num, @ModelAttribute("requestDTO") PageRequestDTO requestDTO, Model model) {
        //@ModelAttribute는 클라이언트가 전송하는 여러 파라미터들을 1대1로 객체에 바인딩하여 다시 View로 넘겨서 출력하기 위해 사용되는 오브젝트이다.

        log.info("num :" +num);

        EmployDTO dto = service.read(num);

        model.addAttribute("dto", dto);
    }

    @GetMapping("/register")
    public String register() {

        return "/Employ/register";
    }

}
