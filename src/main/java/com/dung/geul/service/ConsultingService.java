package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;

public interface ConsultingService {
    default Consulting dtoToEntity(ConsultingDTO consultingDTO){

        Consulting consulting = Consulting.builder()
                .consult_num(consultingDTO.getConsult_num())
                .Consult_field(consultingDTO.getType())
                .consult(Consult.builder().Consult_field(consultingDTO.getType()).build())
                .consult(Consult.builder().cno(consultingDTO.getCno()).build())
                .consult_date(consultingDTO.getConsult_date())
                .consult_time(consultingDTO.getConsult_time())
                .build();
        return consulting;
    }

    default ConsultingDTO entityToDto(Consulting consulting){

        ConsultingDTO consultingDTO = ConsultingDTO.builder()
                .consult_num(consulting.getConsult_num())
                .type(consulting.getConsult_field())
                .cno(consulting.getConsult().getCno())
                .consult_time(consulting.getConsult_time())
                .consult_date(consulting.getConsult_date())
                .build();
        return consultingDTO;
    }
}
