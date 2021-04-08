package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.service.CvServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/application")
public class ApplicationRestController {

    @Autowired
    private CvServiceImpl cvServiceImpl;

    // 이력서 관련
    @PostMapping("/cv/register")
    public RedirectView cvRegister(CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        cvServiceImpl.register(cvPageDTO);

        return new RedirectView("/application/cv/read");
    }

    @PostMapping("/cv/modify")
    public RedirectView cvModify(CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvModify() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        cvServiceImpl.modify(cvPageDTO);

        return new RedirectView("/application/cv/read");
    }

    @GetMapping("/cv/delete")
    public RedirectView cvDelete(Long cv_id){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("enterPriseDTO : " + cv_id);

        cvServiceImpl.delete(cv_id);

        return new RedirectView("/application/cv/before");
    }

}
