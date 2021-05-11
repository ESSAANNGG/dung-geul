package com.dung.geul.service;

import com.dung.geul.dto.BoardDto;
import com.dung.geul.entity.Board;
import com.dung.geul.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

// Repository에서 모든 데이터를 조회하여, BoardDto List에 데이터를 넣어 반환

@Log4j2
@RequiredArgsConstructor
@Service
public class BoardService {
    private BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Transactional // @Transactional 어노테이션은 begin, commit을 자동으로 수행해 준다. 예외를 발생시키면 rollback처리를 자동으로 해준다.
    public Long savePost(BoardDto boardDto) {
        return boardRepository.save(boardDto.toEntity()).getNum();
    }

    @Transactional
    public List<BoardDto> getBoardList() {  // 게시물의 목록을 가져온다.
        List<Board> boardList = boardRepository.findAll();
        List<BoardDto> boardDtoList = new ArrayList<>();

        for(Board board : boardList) {
            BoardDto boardDto = BoardDto.builder()
                    .num(board.getNum())
                    .b(board.getB())
                    .board_title(board.getBoard_title())
                    .content(board.getContent())
//                    .createdDate(board.getCreatedDate())
                    .build();
            boardDtoList.add(boardDto);
        }
        return boardDtoList;
    }

    // getPost()로 게시글의 id를 받아와 해당 게시글의 데이터만 가져와서 화면에 출력한다.
    @Transactional
    public BoardDto getPost(Long id) {
        Board board = boardRepository.findById(id).get();

        BoardDto boardDto = BoardDto.builder()
                .num(board.getNum())
                .b(board.getB())
                .board_title(board.getBoard_title())
                .content(board.getContent())
                .fileId(board.getFileId())
//               .createdDate(board.getCreatedDate())
                .build();
        return boardDto;
    }

    // 조회 페이지에서 삭제 버튼을 누를 시, /post/{id}로 Delete요청을 한다.
    // 만약 1번 글에서 삭제 버튼을 누를 시 /post/1로 접속된다.
    // id값을 사용하여, 해당글을 DB에서 삭제한다.
    @Transactional
    public void deletePost(Long id) {
        boardRepository.deleteById(id);
    }   // 삭제
}
