package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.service.ConsultService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@Log4j2
@RestController
public class ConsultRestController {

    @Autowired
    ConsultService consultService;

    //상담등록
    @PostMapping("/rest/conReg")
    public void register(@RequestBody ConsultDTO consultDTO){
        consultService.register(consultDTO);
        log.info(consultDTO);
    }


}
