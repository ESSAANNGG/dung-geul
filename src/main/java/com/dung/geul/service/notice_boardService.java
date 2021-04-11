package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;

public interface notice_boardService {

    PageResultDTO<notice_boardDTO, Board> getList(PageRequestDTO pageRequestDTO);   // 게시글 조회

    notice_boardDTO read(Long num);   // 방명록의 조회 처리

    Long register(notice_boardDTO dto); // 글 작성 페이지

    void modify(notice_boardDTO dto);   // 글 수정

    void remove(Long num);    // 글 삭제


    default Board dtoToEntity(notice_boardDTO dto) {    // dto -> entity
        Board entity = Board.builder()
                .num(dto.getNum())
                .title(dto.getTitle())
                .content(dto.getContent())
                .b(dto.getB())
                .build();

        return entity;
    }

    default notice_boardDTO entityToDto(Board entity){   // entity -> dto

        notice_boardDTO dto = notice_boardDTO.builder()
                .num(entity.getNum())
                .title(entity.getTitle())
                .content(entity.getContent())
                .b(entity.getB())
                //.regDate(entity.getRegDate())
                //.modDate(entity.getModDate())
                .build();

        return dto;
    }
}
