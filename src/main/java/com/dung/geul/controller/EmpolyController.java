package com.dung.geul.controller;

import com.dung.geul.entity.Empoly;
import com.dung.geul.repository.EmpolyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/Empoly")
@Controller
public class EmpolyController {
    @Autowired
    EmpolyRepository empolyRepository;

    @GetMapping("/list")
    public String list(Model model, Pageable pageable){
        Page<Empoly> EmpolyList = empolyRepository.findAll(pageable);

       int startPage = Math.max(1, EmpolyList.getPageable().getPageNumber() - 4);
       int endPage = Math.min(EmpolyList.getTotalPages(),EmpolyList.getPageable().getPageNumber() + 4);


       model.addAttribute("startPage", startPage);
       model.addAttribute("endPage", endPage);
       model.addAttribute("EmpolyList", EmpolyList);
        return "Empoly/list";
    }

}
