package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;

public interface ConsultingService {
    Long register(ConsultingDTO consultingDTO);

    void remove(Long consult_num);

    default Consulting dtoToEntity(ConsultingDTO consultingDTO){

        Consulting consulting = Consulting.builder()
                .consult_num(consultingDTO.getConsult_num())
                .consult(Consult.builder().cno(consultingDTO.getCno()).build())
                .member(Member.builder().user_id(consultingDTO.getUser_id()).build())
                .consult_date(consultingDTO.getConsult_date())
                .build();
        return consulting;
    }

    default ConsultingDTO entityToDto(Consulting consulting){

        ConsultingDTO consultingDTO = ConsultingDTO.builder()
                .consult_num(consulting.getConsult_num())
                .cno(consulting.getConsult().getCno())
                .user_id(consulting.getMember().getUser_id())
                .user_name(consulting.getMember().getUser_name())
                .consult_date(consulting.getConsult_date())
                .build();
        return consultingDTO;
    }
}
