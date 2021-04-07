package com.dung.geul.service;


import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;
import com.dung.geul.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Log4j2
@Service
@RequiredArgsConstructor
public class notice_boardServiceImpl implements notice_boardService {

    private final BoardRepository boardRepository;

    @Override
    public PageResultDTO<notice_boardDTO, Board> getList(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("num").descending());    // 글 번호를 기준으로 내림차순
        Page<Board> result = boardRepository.findAll(pageable);
        Function<Board, notice_boardDTO> fn = (entity -> entityToDto(entity));      // java util의 함수를 람다식으로 표현

        return new PageResultDTO<>(result, fn);
    }

    @Override
    public notice_boardDTO read(Long num) {
        log.info("num :" + num);

        Optional<Board> result = boardRepository.findById(num);

        //isPresent() :저장된 값이 존재하면 true를 반환하고, 값이 존재하지 않으면 false를 반환함.
        return result.isPresent()? entityToDto(result.get()): null;
    }

    @Override
    public Long register(notice_boardDTO notice_boardDTO) {

        Board board = dtoToEntity(notice_boardDTO);

        boardRepository.save(board);

        return board.getNum();
    }

    @Override
    public void modify(notice_boardDTO notice_boardDTO) {

        Board board = dtoToEntity(notice_boardDTO);

        boardRepository.save(board);

    }

    @Override
    public void remove(Long num) {

        boardRepository.deleteById(num);

    }

}