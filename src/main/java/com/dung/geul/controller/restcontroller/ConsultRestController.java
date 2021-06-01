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
    ConsultServiceImpl consultService;

    @PostMapping("/admin_consult_Reg")
    public ConsultDTO reg (ConsultDTO consultDTO){
        System.out.println("Controller : consultRegister() 실행");
        System.out.println("consultDTO : " + consultDTO);

        consultService.register(consultDTO);
        return consultDTO;
    }
}
