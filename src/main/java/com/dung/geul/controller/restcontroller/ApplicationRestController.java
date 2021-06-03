package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.service.CvServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Optional;

@RestController
@RequestMapping("/application")
public class ApplicationRestController {

    @Autowired
    private CvServiceImpl cvServiceImpl;

    // 이력서 관련
    @PostMapping("/cv/register")
    public int cvRegister(@RequestBody CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        int result = cvServiceImpl.register(cvPageDTO);

        return  result;
    }

    @PostMapping("/cv/modify")
    public RedirectView cvModify(CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvModify() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        cvServiceImpl.modify(cvPageDTO);

        return new RedirectView("/application/cv/read");
    }

    @GetMapping("/cv/delete")
    public RedirectView cvDelete(String user_id){

        System.out.println("CvDelete : cv 삭제 실행");

        System.out.println("user_id : " + user_id);

        cvServiceImpl.delete(user_id);

        return new RedirectView("/application/cv/before");
    }

}
