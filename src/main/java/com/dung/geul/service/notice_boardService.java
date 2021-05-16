package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.Notice_boardDTO;
import com.dung.geul.entity.Board;

public interface notice_boardService {

    PageResultDTO<Notice_boardDTO, Board> getList(PageRequestDTO pageRequestDTO);   // 게시글 조회

    Notice_boardDTO read(Long num);   // 방명록의 조회 처리

    Long register(Notice_boardDTO dto); // 글 작성 페이지

    void remove(Long num);    // 글 삭제

    void modify(Notice_boardDTO dto);   // 글 수정



    default Board dtoToEntity(Notice_boardDTO dto) {    // dto -> entity
        Board entity = Board.builder()
                .num(dto.getNum())
                .board_title(dto.getTitle())
                .content(dto.getContent())
                .b(dto.getB())
                .build();

        return entity;
    }

    default Notice_boardDTO entityToDto(Board entity){   // entity -> dto

        Notice_boardDTO dto = Notice_boardDTO.builder()
                .num(entity.getNum())
                .title(entity.getBoard_title())
                .content(entity.getContent())
                .b(entity.getB())
                //.regDate(entity.getRegDate())
                //.modDate(entity.getModDate())
                .build();

        return dto;
    }
}
