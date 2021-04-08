package com.dung.geul.repository;

import com.dung.geul.entity.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.IntStream;

// board 테이블에 더미데이터 생성 ====================================================================
// application.properties에 spring.jpa.hibernate.ddl-auto를 create로 변경 해야 함
// IO 오류 : DB접속자 수가 많을 시 오류 발생
// 해결법 : 종료 할때 까지 대기하거나 종료 해달라 해야됨
// ===============================================================================================

/*@SpringBootTest
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

}*/
