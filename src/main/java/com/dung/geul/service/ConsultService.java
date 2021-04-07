package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Member;

public interface ConsultService {

    Long register(ConsultDTO consultDTO);

    PageResultDTO<ConsultDTO, Object[]> getList(PageRequestDTO pageRequestDTO);
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

        default ConsultDTO entityToDTO(Consult consult, Member member){
            ConsultDTO consultDTO = ConsultDTO.builder()
                    .cno(consult.getCno_num())
                    .field(consult.getConsult_field())
                    .detail_field(consult.getConsult_detail_field())
                    .user_id(member.getUser_id())
                    .build();
            return consultDTO;
        }
}
