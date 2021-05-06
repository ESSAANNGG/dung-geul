package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;

public interface ConsultService {

//    ConsultDTO read(Long cno_num);
    PageResultDTO<ConsultDTO, Consult> getList(PageRequestDTO pageRequestDTO);

    ConsultDTO read(Long cno_num);

    void remove(Long cno_num);

    void modify(ConsultDTO consultDTO);



    Long register(ConsultDTO consultDTO);

    default Consult dtoToEntity(ConsultDTO consultDTO){
        Consult consult = Consult.builder()
                .cno_num(consultDTO.getCno_num())
                .Consult_detail_field(consultDTO.getConsult_detail_field())
                .Consult_field(consultDTO.getConsult_field())
                .build();
        return consult;
    }

    default ConsultDTO entityToDto(Consult consult){
        ConsultDTO consultDTO = ConsultDTO.builder()
                .cno_num(consult.getCno_num())
                .Consult_field(consult.getConsult_field())
                .Consult_detail_field(consult.getConsult_detail_field())
                .build();
        return consultDTO;
    }
}
