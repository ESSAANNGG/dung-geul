package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.AllowConsultingDTO;
import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.service.ConsultingServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        return consultingService.conok(consult_num, result);
    }
}
