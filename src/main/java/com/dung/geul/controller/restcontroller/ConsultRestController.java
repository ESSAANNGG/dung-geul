package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.ConsultServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Log4j2
@RestController
@RequestMapping("/admin")
public class ConsultRestController {

    @Autowired
    ConsultService consultService;

    @PostMapping("/admin_consult_Regda")
    public ResponseEntity<Long> reg (ConsultDTO consultDTO){

        log.info("dto" + consultDTO);
        Long cno = consultService.register(consultDTO);
        return new ResponseEntity<>(cno, HttpStatus.OK);
    }
}
