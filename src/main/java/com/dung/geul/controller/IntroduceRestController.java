package com.dung.geul.controller;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.entity.Introduce;
import com.dung.geul.service.EmployService;
import com.dung.geul.service.IntroduceService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
public class IntroduceRestController {

    @Autowired
    IntroduceService introduceService;

    //자소서등록
    @PostMapping("/intro/introReg")
    public void register(@RequestBody IntroduceDTO introduceDTO) {
        introduceService.register(introduceDTO);

    }

    //자소서삭제
    @DeleteMapping("/intro/{num}")
    public ResponseEntity<String> remove(@PathVariable("num") Long num) {

        log.info("Num:" + num);

        introduceService.remove(num);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }

    //자소서수정
    @PutMapping("/intro/introSave")
    public ResponseEntity<String> modify(@RequestBody IntroduceDTO introduceDTO) {

        log.info(introduceDTO);

        introduceService.modify(introduceDTO);

        return new ResponseEntity<>("succes", HttpStatus.OK);
    }
}
