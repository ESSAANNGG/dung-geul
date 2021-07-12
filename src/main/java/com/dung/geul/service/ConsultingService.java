package com.dung.geul.service;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;

import java.util.function.Function;

public interface ConsultingService {

    default Function<Object[], ConsultingDTO> getFunction(){
        Function<Object[], ConsultingDTO> fn = (en -> OkEntityDTO((Consult) en[0], (ConsultingDTO) en[1]));
        return fn;
    }
    void remove(Long consult_num);

    PageResultDTO<ConsultingDTO, Consulting> conlist(PageRequestDTO pageRequestDTO);

    default Consulting dtoToEntity(ConsultingDTO consultingDTO){

        Consulting consulting = Consulting.builder()
                .consult_num(consultingDTO.getConsult_num())
                .Consult_field(consultingDTO.getType())
                .cno(Consult.builder().Consult_field(consultingDTO.getType()).build())
                .cno(Consult.builder().cno(consultingDTO.getCno()).build())
                .con_user_name(consultingDTO.getCon_user_name())
                .Consult_detail_field(consultingDTO.getName())
                .consult_date(consultingDTO.getConsult_date())
                .consult_time(consultingDTO.getConsult_time())
                .consult_approve(consultingDTO.getApprove())
                .user_id(Member.builder()
                        .user_id(consultingDTO.getCon_user_id())
                        .build())
                .build();
        return consulting;
    }

    default ConsultingDTO entityToDto(Consulting consulting){

        ConsultingDTO consultingDTO = ConsultingDTO.builder()
                .consult_num(consulting.getConsult_num())
                .type(consulting.getConsult_field())
                .cno(consulting.getCno().getCno())
                .name(consulting.getConsult_detail_field())
                .con_user_name(consulting.getCon_user_name())
                .consult_time(consulting.getConsult_time())
                .consult_date(consulting.getConsult_date())
                .build();
        return consultingDTO;
    }

    //승인목록
    default ConsultingDTO OkEntityDTO(Consult c, ConsultingDTO t){
        ConsultingDTO AllowDTO = new ConsultingDTO(c.getCno());
            AllowDTO.setApprove(t.getApprove());
//
//            int approve;
//
//            if (t.getApprove()==(0)){
//                approve=0;
//            }else if (t.getApprove()==1){
//                approve=1;
//            }else if (t.getApprove()==2){
//                approve=2;
//            }
//
//            AllowDTO.setApprove(approve);
        return AllowDTO;
    }
}
