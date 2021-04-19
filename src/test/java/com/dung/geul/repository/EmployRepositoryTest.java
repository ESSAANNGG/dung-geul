package com.dung.geul.repository;

import com.dung.geul.entity.Employ;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
public class EmployRepositoryTest {

    @Autowired
    private EmployRepository employRepository;


    @Test
    public void testInsertDummies(){

        IntStream.rangeClosed(1,200).forEach(i -> {
            Employ em = Employ.builder()
                    .title("제목....." + i)
                    .content("[PHP] 웹개발자 모집 공고 데이터베이스 및 온라인정보 제공업업종의 온라인정보제공업,전자상거래업,소프트웨어개발 및 공급업사업을 하는 중소기업")
                    .build();
            employRepository.save(em);
        });
    }


}
