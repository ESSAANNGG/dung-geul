package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import org.springframework.http.ResponseEntity;

public interface ConsultService {

    PageResultDTO<ConsultDTO, Consult> getList(PageRequestDTO pageRequestDTO);

    ConsultDTO read(Long cno);

    void remove(Long cno);

    void modify(ConsultDTO consultDTO);


    default Consult dtoToEntity(ConsultDTO consultDTO){
        Consult consult = Consult.builder()
                .cno(consultDTO.getCno())
                .Consult_field(consultDTO.getType())
                .Consult_detail_field(consultDTO.getName())
                .build();
        return consult;
    }

    default ConsultDTO entityToDto(Consult consult){
        ConsultDTO consultDTO = ConsultDTO.builder()
                .cno(consult.getCno())
                .type(consult.getConsult_field())
                .name(consult.getConsult_detail_field())
                .consult_regdate(consult.getRegDate())
                .consult_moddate(consult.getModDate())
                .build();
        return consultDTO;
    }
}
