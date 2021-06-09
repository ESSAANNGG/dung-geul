package com.dung.geul.controller.restcontroller;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.service.ConsultingServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
}
