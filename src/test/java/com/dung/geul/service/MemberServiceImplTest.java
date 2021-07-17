package com.dung.geul.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.reflections.Reflections.log;

class MemberServiceImplTest {

    @Autowired
    private MemberServiceImpl memberService;

    @Test
    void confirmNameAndPhone() {

        String[] phones = new String[3];

        phones[0] = "010";
        phones[1] = "2063";
        phones[2] = "5065";


        String id = memberService.confirmNameAndPhone("정혜리", phones);
        log.info("id : " + id);
    }
}