package com.dung.geul.service;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.dto.notice_boardDTO;
import com.dung.geul.entity.Board;

public interface notice_boardService {

    PageResultDTO<notice_boardDTO, Board> getList(PageRequestDTO pageRequestDTO);

    notice_boardDTO read(Long board_num);   // 방명록의 조회 처리

    Long register(notice_boardDTO notice_boardDTO);

    void modify(notice_boardDTO notice_boardDTO);

    void remove(Long board_num);


    default Board dtoToEntity(notice_boardDTO dto) {    // dto -> entity
        Board entity = Board.builder()
                .num(dto.getNum())
                .board_title(dto.getTitle())
//                .content(dto.getContent())
//                .b(dto.getB())
                .build();

        return entity;
    }

    default notice_boardDTO entityToDto(Board entity){   // entity -> dto

        notice_boardDTO dto = notice_boardDTO.builder()
                .num(entity.getNum())
                .title(entity.getBoard_title())
//                .content(entity.getContent())
//                .b(entity.getB())
                //.regDate(entity.getRegDate())
                //.modDate(entity.getModDate())
                .build();

        return dto;
    }
}
