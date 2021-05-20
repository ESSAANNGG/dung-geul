package com.dung.geul.controller.restcontroller;


import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.security.dto.AuthMemberDTO;
import com.dung.geul.service.EmployService;


import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@Log4j2
@RestController
public class EmployRestController {

    @Autowired
    EmployService employService;


    //채용공고등록
    @PostMapping("/rest/emReg")
    public void register(@RequestBody EmployDTO employDTO) {
        employService.register(employDTO);

    }

    //채용공고삭제
    @DeleteMapping("/rest/{num}")
    public ResponseEntity<String> remove(@PathVariable("num") Long num) {

        log.info("Num:" + num);

        employService.remove(num);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    //채용공고수정
    @PutMapping("/rest/emSave")
    public ResponseEntity<String> modify(@RequestBody EmployDTO employDTO) {

        log.info(employDTO);

        employService.modify(employDTO);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }
}