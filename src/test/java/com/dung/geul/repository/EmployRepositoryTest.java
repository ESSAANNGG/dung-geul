package com.dung.geul.repository;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.entity.Employ;
import com.dung.geul.service.EmployService;
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
            Employ em = Employ.builder().title("Sample...." + i).build();
            employRepository.save(em);
        });
    }


}
