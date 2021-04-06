package com.dung.geul.controller;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.service.EmployService;

import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class EmpolyRestController {

    @Autowired
    EmployService employService;

    @PostMapping("/rest/emReg")
    public void register(@RequestBody EmployDTO employDTO){

        log.info(employDTO);

        employService.register(employDTO);

    }
}
