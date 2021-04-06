package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Member;

public interface ConsultService {

    Long register(ConsultDTO consultDTO);

    default Consult dtoToEntity(ConsultDTO consultDTO){
        Member member = Member.builder()
                .user_id(consultDTO.getUser_id())
                .build();

        Consult consult = Consult.builder()
                .cno_num(consultDTO.getCno())
                .Consult_field(consultDTO.getField())
                .Consult_detail_field(consultDTO.getDetail_field())
                .user_id(member)
                .build();
        return consult;
    }
}
