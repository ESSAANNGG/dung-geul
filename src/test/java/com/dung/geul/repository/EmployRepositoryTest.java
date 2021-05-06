package com.dung.geul.repository;

import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Enterprise;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Arrays;
import java.util.stream.IntStream;

@SpringBootTest
public class EmployRepositoryTest {

    @Autowired
    private EmployRepository employRepository;


    @Test
    public void testInsertDummies(){

        IntStream.rangeClosed(1,100).forEach(i -> {

            Enterprise enterprise = Enterprise.builder().etp_id("기업" + i).build();

            Employ employ = Employ.builder()
                    .title("제목....." + i)
                    .content("[PHP] 웹개발자 모집 공고 데이터베이스 및 온라인정보 제공업업종의 온라인정보제공업,전자상거래업,소프트웨어개발 및 공급업사업을 하는 중소기업")
                    .ot("경영·회계·사무 관련직")
                    .etp_id(enterprise)
                    .build();
            employRepository.save(employ);
        });
    }

//    @Test
//    public void testEmployWithEnterprise() {
//
//        Object result = employRepository.getEmployWithEnterprise(201L);
//
//        Object[] arr = (Object[])result;
//
//        System.out.println("---------------------------");
//        System.out.println(Arrays.toString(arr));
//    }

}
