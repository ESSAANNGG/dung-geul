package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.service.ConsultServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;


@RestController
@RequestMapping("/admin")
@Log4j2
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


    @DeleteMapping("/remove/{cno}")
    public ResponseEntity<String> remove(@PathVariable("cno") Long cno){
        log.info("----------삭제실행----------");
        log.info("cno  " + cno);
        consultService.remove(cno);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
