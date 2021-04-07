package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;

public interface notice_boardService {

    PageResultDTO<notice_boardDTO, Board> getList(PageRequestDTO pageRequestDTO);

    notice_boardDTO read(Long num);

   Long register(notice_boardDTO notice_boardDTO);

   void modify(notice_boardDTO notice_boardDTO);

   void remove(Long num);

    default Board dtoToEntity(notice_boardDTO dto) {
        Board entity = Board.builder()
                .num(dto.getNum())
                .board_title(dto.getTitle())
                .build();

        return entity;
    }

    default notice_boardDTO entityToDto(Board entity){

        notice_boardDTO dto = notice_boardDTO.builder()
                .num(entity.getNum())
                .title(entity.getTitle())
                //.regDate(entity.getRegDate())
                //.modDate(entity.getModDate())
                .build();

        return dto;
    }
}
