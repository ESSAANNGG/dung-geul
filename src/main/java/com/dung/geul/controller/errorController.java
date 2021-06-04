package com.dung.geul.controller;

import com.dung.geul.dto.SearchDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RequestMapping("/error")
@Controller
public class errorController {
    @GetMapping("/error")
    public void error(){
    }
}
