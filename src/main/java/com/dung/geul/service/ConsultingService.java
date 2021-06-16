package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;

public interface ConsultingService {

    PageResultDTO<ConsultingDTO, Consulting> conlist(PageRequestDTO pageRequestDTO);

    default Consulting dtoToEntity(ConsultingDTO consultingDTO){

        Consulting consulting = Consulting.builder()
                .consult_num(consultingDTO.getConsult_num())
                .Consult_field(consultingDTO.getType())
                .cno(Consult.builder().Consult_field(consultingDTO.getType()).build())
                .cno(Consult.builder().cno(consultingDTO.getCno()).build())
                .consult_date(consultingDTO.getConsult_date())
                .consult_time(consultingDTO.getConsult_time())
                .user_id(Member.builder()
                        .user_id(consultingDTO.getCon_user_id())
                        .user_name(consultingDTO.getCon_user_name())
                        .build())
                .build();
        return consulting;
    }

    default ConsultingDTO entityToDto(Consulting consulting){

        ConsultingDTO consultingDTO = ConsultingDTO.builder()
                .consult_num(consulting.getConsult_num())
                .type(consulting.getConsult_field())
                .cno(consulting.getCno().getCno())
                .con_user_name(consulting.getCon_user_name())
                .consult_time(consulting.getConsult_time())
                .consult_date(consulting.getConsult_date())
                .build();
        return consultingDTO;
    }
}
