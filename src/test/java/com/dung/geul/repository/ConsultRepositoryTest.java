package com.dung.geul.repository;

import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Member;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.stream.IntStream;

@SpringBootTest
public class ConsultRepositoryTest {
    @Autowired
    private ConsultRepository consultRepository;

    @Test
    public void insertConsult(){
        IntStream.rangeClosed(1,100).forEach(i -> {
            Member member = Member.builder().user_id("123").build();

            Consult consult = Consult.builder()
                    .Consult_field("진로" + i)
                    .Consult_detail_field("상담" +i)
                    .user_id(member)
                    .build();
            consultRepository.save(consult);
        });
    }

    @Test
    public void testRead1(){
        Optional<Consult> result = consultRepository.findById(50L);

        Consult consult = result.get();

        System.out.println(consult);

    }
}
