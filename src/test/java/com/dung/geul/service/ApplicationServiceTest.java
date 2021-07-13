package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.CV;
import com.dung.geul.repository.EmployRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ApplicationServiceTest {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private CvServiceImpl cvService;

    @Autowired
    private EmployRepository employRepository;

    @Test
    public void employApplyPageTest(){

        PageRequestDTO pageRequestDTO = new PageRequestDTO();
        Long num = Long.valueOf(91);
        PageResultDTO result = applicationService.employApplyPage(num, pageRequestDTO, "대기중");

        System.out.println("result : " + result);
    }

    @Test
    public void alreadyApply(){
        Long cv_id = Long.valueOf(221);
        Long em_id = Long.valueOf(223);

        CV cv = cvService.getCv(cv_id);

        Boolean result = applicationService.alreadyApply(cv, em_id);
        System.out.println(result);

    }
}