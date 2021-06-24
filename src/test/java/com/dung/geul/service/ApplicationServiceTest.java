package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationServiceTest {

    @Autowired
    private ApplicationService applicationService;

    @Test
    public void employApplyPageTest(){

        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        Long num = Long.valueOf(220);
        PageResultDTO result = applicationService.employApplyPage(num, pageRequestDTO);

        System.out.println("result : " + result);
    }
}