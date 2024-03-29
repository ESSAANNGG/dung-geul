package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;

public interface notice_boardService {  // 공지사항 게시판 Service

    PageResultDTO<notice_boardDTO, Board> getList(PageRequestDTO pageRequestDTO);   // 게시글 조회

    notice_boardDTO read(Long num);   // 방명록의 조회 처리

    Long register(notice_boardDTO dto); // 글 작성 페이지

    void remove(Long num);    // 글 삭제

    void modify(notice_boardDTO dto);   // 글 수정


    default Board dtoToEntity(notice_boardDTO dto) {    // dto -> entity
        Board entity = Board.builder()
                .num(dto.getNum())
                .board_title(dto.getTitle())
                .content(dto.getContent())
                .b(dto.getB())
                .board_file(dto.getBoard_file())
                .file_name(dto.getFile_name())
                .type(dto.getType())
                .build();

        return entity;
    }

    default notice_boardDTO entityToDto(Board entity){   // entity -> dto

        notice_boardDTO dto = notice_boardDTO.builder()
                .num(entity.getNum())
                .title(entity.getBoard_title())
                .content(entity.getContent())
                .b(entity.getB())
                .board_file(entity.getBoard_file())
                .file_name(entity.getFile_name())
                .regDate(entity.getRegDate())
                .type(entity.getType())
                .build();

        return dto;
    }
}
