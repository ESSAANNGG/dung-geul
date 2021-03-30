package com.dung.geul.repository;

import com.dung.geul.entity.Empoly;
import com.dung.geul.service.EmpolyServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
public class EmpolyRepositoryTest {

    @Autowired
    private EmpolyRepository empolyRepository;

    @Test
    public void testInsertDummies(){

        IntStream.rangeClosed(1,100).forEach(i -> {
            Empoly em = Empoly.builder().title("Sample...." + i).build();
            empolyRepository.save(em);
        });
    }
}
