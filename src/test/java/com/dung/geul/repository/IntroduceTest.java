package com.dung.geul.repository;

import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.entity.Introduce;
import com.dung.geul.entity.Member;
import com.dung.geul.service.IntroduceService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.sql.Clob;
import java.util.stream.IntStream;

@SpringBootTest
public class IntroduceTest {

    @Autowired
    private IntroduceRepository introduceRepository;

    @Autowired
    private IntroduceService introduceService;

    /*@Test
    public void insertIntro() {
        IntStream.rangeClosed(1,14).forEach(i -> {
            Member member = Member.builder().user_id("student" +i).build();

            Introduce introduce = Introduce.builder()
                    .title("Title..." + i)
                    .content("Content..."+i)
                    .writer(member)
                    .build();

            introduceRepository.save(introduce);
        });
    }*/

    @Test
    public void testReigster() {
//
//        IntroduceDTO introduceDTO = IntroduceDTO.builder()
//            .title("Test.")
//            .content("Test...")
//            .user_id("student1")
//                .build();
//
//        Long num = introduceService.register(introduceDTO);
    }
}
