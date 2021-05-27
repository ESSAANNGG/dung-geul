package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.service.ConsultService;
import com.dung.geul.service.ConsultingService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Log4j2
@RestController
public class ConsultRestController {

    @Autowired
    ConsultingService consultingService;

    //상담신청
    @PostMapping("/rest/conapply")
    public ResponseEntity<Long> register(@RequestBody ConsultingDTO consultingDTO){
        log.info("-----------------신청-----------------------");
        Long consult_num = consultingService.register(consultingDTO);
        log.info(consultingDTO);

        return new ResponseEntity<>(consult_num, HttpStatus.OK);
    }


}
