package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.LicenseService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.reflections.Reflections.log;

@Log4j2
@RestController
@RequestMapping("/api/license")
public class LicenseRestController {

    @Autowired
    private LicenseService licenseService;


}
