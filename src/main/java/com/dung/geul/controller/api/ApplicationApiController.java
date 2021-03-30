package com.dung.geul.controller.api;

import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.service.CvService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/application")
public class ApplicationApiController {

    @Autowired
    private CvService cvService;

    @PostMapping("/cv/register")
    public RedirectView cvRegister(CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        cvService.register(cvPageDTO);

        return new RedirectView("/application/cv/read");
    }

    @PostMapping("/cv/modify")
    public RedirectView cvModify(CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvModify() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        cvService.modify(cvPageDTO);

        return new RedirectView("/application/cv/read");
    }

    @GetMapping("/cv/delete")
    public RedirectView cvDelete(Long cv_id){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("enterPriseDTO : " + cv_id);

        cvService.delete(cv_id);

        return new RedirectView("/application/cv/read");
    }

}
