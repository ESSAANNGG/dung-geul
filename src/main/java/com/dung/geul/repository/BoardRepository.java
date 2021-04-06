package com.dung.geul.repository;

import com.dung.geul.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
// 보드 레포지토리 인터페이스는 컨트롤러의 model을 사용할 수 있도록 한다.
// 보드레포지토리 인터페이스는 jpa레포지토리를 상속받음<모델클래스, PK>
public interface BoardRepository extends JpaRepository<Board, Long> {

/*    List<Board> findByTitle(String board_title);
    List<Board> findByTitleOrContent(String board_title, String board_content);

    Page<Board> findByTitleContainingOrContentContaining(String board_title, String board_content, Pageable pageable);
*/
}
