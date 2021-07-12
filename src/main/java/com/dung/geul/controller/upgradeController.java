package com.dung.geul.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping ("/upgrade")

public class upgradeController {
    @GetMapping("/upgrades")  // 심리 검사
    public void upgrades() {
    }
}


