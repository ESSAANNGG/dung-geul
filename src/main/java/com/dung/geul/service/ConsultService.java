package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;

public interface ConsultService {

    PageResultDTO<ConsultDTO, Consult> getList(PageRequestDTO pageRequestDTO);

    ConsultDTO read(Long cno);

    void remove(Long cno);

    void modify(ConsultDTO consultDTO);

    Long register(ConsultDTO consultDTO);

    default Consult dtoToEntity(ConsultDTO consultDTO){
        Consult consult = Consult.builder()
                .cno(consultDTO.getCno())
                .Consult_detail_field(consultDTO.getConsult_detail_field())
                .Consult_field(consultDTO.getConsult_field())
                .build();
        return consult;
    }

    default ConsultDTO entityToDto(Consult consult){
        ConsultDTO consultDTO = ConsultDTO.builder()
                .cno(consult.getCno())
                .Consult_field(consult.getConsult_field())
                .Consult_detail_field(consult.getConsult_detail_field())
                .build();
        return consultDTO;
    }
}
