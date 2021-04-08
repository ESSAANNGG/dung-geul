//package com.dung.geul.service;
//
//import com.dung.geul.dto.ConsultDTO;
//
//import com.dung.geul.dto.PageRequestDTO;
//import com.dung.geul.dto.PageResultDTO;
//import com.dung.geul.entity.Consult;
//import com.dung.geul.entity.Member;
//
//public interface ConsultService {
//
//    Long register(ConsultDTO consultDTO);
//
//    PageResultDTO<ConsultDTO, Object[]> getList(PageRequestDTO pageRequestDTO);
//
////    ConsultDTO get(Long cno_num);
//
//        default Consult dtoToEntity(ConsultDTO consultDTO){
//            Member member = Member.builder()
//                    .user_id(consultDTO.getUser_id())
//                    .build();
//
//            Consult consult = Consult.builder()
//                    .cno_num(consultDTO.getCno_num())
//                    .Consult_field(consultDTO.getConsult_field())
//                    .Consult_detail_field(consultDTO.getConsult_detail_field())
//                    .user_id(member)
//                    .build();
//            return consult;
//        }
//
//        default ConsultDTO entityToDTO(Consult consult,Member member){
//            ConsultDTO consultDTO = ConsultDTO.builder()
//                    .cno_num(consult.getCno_num())
//                    .Consult_field(consult.getConsult_field())
//                    .Consult_detail_field(consult.getConsult_detail_field())
//                    .user_id(member.getUser_id())
//                    .build();
//            return consultDTO;
//        }
//}
