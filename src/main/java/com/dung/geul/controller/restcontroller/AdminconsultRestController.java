package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.service.ConsultServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin")
public class AdminconsultRestController {

    @Autowired
    ConsultServiceImpl consultService;

    @PostMapping("/admin_consult_Reg")
    public ConsultDTO register (@RequestBody ConsultDTO consultDTO){

        System.out.println("Controller : consultRegister() 실행");
        System.out.println("consultDTO : " + consultDTO);

        consultService.register(consultDTO);
        return consultDTO;
    }
}
