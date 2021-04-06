package com.dung.geul.repository;

import com.dung.geul.entity.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

@SpringBootTest
public class BoardRepositoryTest {

    @Autowired
    private BoardRepository boardRepository;

    @Test
    public void testInsertDummies(){


        IntStream.rangeClosed(1,200).forEach(i -> {
            Board em = Board.builder().board_title("Sample...." + i).build();
            boardRepository.save(em);
        });

    }

}
