package com.dung.geul.controller.restcontroller;

import com.dung.geul.service.notice_boardService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Log4j2
@RestController
@RequestMapping("/center-information")
public class CenterInformationRestController {

    @Autowired
    private notice_boardService service;

//    //지민우 관리자 게시글 삭제
    @PostMapping("/remove_admin")
    public ResponseEntity remove_admin(@RequestParam("num") long num){  // 게시글 삭제

        try {
            log.info("remove_admin - num: " + num);

            service.remove(num);

            return new ResponseEntity(num, HttpStatus.OK);
        } catch (Exception e) {

            return new ResponseEntity(0, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}
