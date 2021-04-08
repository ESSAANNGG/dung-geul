//package com.dung.geul.service;
//
//import com.dung.geul.dto.ConsultDTO;
//import com.dung.geul.dto.PageRequestDTO;
//import com.dung.geul.dto.PageResultDTO;
//import com.dung.geul.entity.Consult;
//import com.dung.geul.entity.Member;
//import com.dung.geul.repository.ConsultRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.log4j.Log4j2;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.domain.Sort;
//import org.springframework.stereotype.Service;
//
//import java.util.function.Function;
//
//@Service
//@RequiredArgsConstructor
//@Log4j2
//public class ConsultServiceImpl implements ConsultService{
//    private final ConsultRepository consultRepository;
//
//    @Override
//    public PageResultDTO<ConsultDTO, Object[]> getList(PageRequestDTO requestDTO){
////        Pageable pageable = requestDTO.getPageable(Sort.by("cno_num").descending());
//        Function<Object[], ConsultDTO> fn = (en -> entityToDTO((Consult)en[0],(Member)en[1]));
//        Page<Object[]> result = consultRepository.getConsultWithApplyUser(requestDTO.getPageable(Sort.by("cno_num").descending()));
//
//        return new PageResultDTO<>(result, fn);
//    }
//
////    @Override
////    public ConsultDTO get(Long cno_num) {
////        return null;
////    }
//
//    @Override
//    public Long register(ConsultDTO consultDTO) {
//
//        Consult consult = dtoToEntity(consultDTO);
//        consultRepository.save(consult);
//        return consult.getCno_num();
//    }
//
////    @Override //조회
////    public ConsultDTO get(Long cno) {
////        Object result = consultRepository.getConsultBycno(cno);
////        Object[] arr = (Object[]) result;
////        return entityToDTO((Consult) arr[0],(Member) arr[1]);
////    }
////    @Override
////    public PageResultDTO<ConsultDTO, Object[]> getList(PageRequestDTO pageRequestDTO) {
////        log.info(pageRequestDTO);
////        Function<Object[], ConsultDTO> fn =(en -> entityToDTO (Consult)en[0],(Member)en[1]);
////        Page<Object[]> result = consultRepository.getConsultWithuser_id(pageRequestDTO.getPageable(Sort.by("cno_num").descending()));
////
////        return new PageResultDTO<>(result,fn);
////    }
//}
