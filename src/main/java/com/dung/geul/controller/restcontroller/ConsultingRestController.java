package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.AllowConsultingDTO;
import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.service.ConsultingServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
public class ConsultingRestController {
    @Autowired
    private ConsultingServiceImpl consultingService;

    @PostMapping("/counseling/counseling")
    public ConsultingDTO conapply(@RequestBody ConsultingDTO consultingDTO){
        log.info("---------------정보확인---------------" + consultingDTO);

        consultingService.coapply(consultingDTO);
        return consultingDTO;
    }

    @PostMapping("/consult/counselling_request")
    public ResponseEntity conok(@RequestBody List<Long> consult_num, @RequestParam("result") String result){
        System.out.println("controller 실행");
        System.out.println("consult_num = " + consult_num + "result" + result);
        System.out.println(consultingService.conok(consult_num, result));
        return consultingService.conok(consult_num, result);
    }

    @DeleteMapping("/remove/{consult_num}")
    public ResponseEntity<String> remove(@PathVariable("consult_num") Long consult_num){
        log.info("----------신청내역삭제실행----------");
        log.info("consult_num  " + consult_num);
        consultingService.remove(consult_num);

        return new ResponseEntity<>("success", HttpStatus.OK);
    }
}
