package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.CvPageDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.entity.License;
import com.dung.geul.handler.HttpResponse;
import com.dung.geul.repository.CvRepository;
import com.dung.geul.repository.LicenseRepository;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.CvServiceImpl;
import com.dung.geul.service.LicenseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/application")
@Log4j2
public class ApplicationRestController {

    @Autowired
    private CvServiceImpl cvServiceImpl;

    @Autowired
    private LicenseService licenseService;

    // 이력서 관련
    @PostMapping("/cv/register")
    public int cvRegister(@RequestBody CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvRegister() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        int result = cvServiceImpl.register(cvPageDTO);

        return  result;
    }

    @PostMapping("/cv/modify")
    public int cvModify(@RequestBody CvPageDTO cvPageDTO){

        System.out.println("ApplicationApiController : cvModify() 실행");
        System.out.println("cvPageDTO : " + cvPageDTO);

        return cvServiceImpl.modify(cvPageDTO);
    }

    @GetMapping("/cv/delete")
    public RedirectView cvDelete(@Param("user_id") String user_id){

        System.out.println("CvDelete : cv 삭제 실행");

        System.out.println("user_id : " + user_id);

        cvServiceImpl.delete(user_id);

        return new RedirectView("/application/cv/before");
    }

    @GetMapping("/cv/license")
    public List<CertificateDTO> roadLicense(@AuthenticationPrincipal AuthMemberDTO authMemberDTO){

        log.info("자격증 리스트 요청 컨트롤러 실행");
        log.info("user_id : " + authMemberDTO.getUser_id() );

        return licenseService.getLicenseList(authMemberDTO.getUser_id());
    }

}
