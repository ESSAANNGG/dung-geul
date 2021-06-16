package com.dung.geul.service;

import com.dung.geul.dto.AllowConsultingDTO;
import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.Member;
import com.dung.geul.entity.QConsult;
import com.dung.geul.entity.QConsulting;
import com.dung.geul.repository.ConsultingRepository;
import com.dung.geul.repository.MemberRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Function;

@Service
@Log4j2
@RequiredArgsConstructor
public class ConsultingServiceImpl implements ConsultingService {
    private final ConsultingRepository consultingRepository;

    private final MemberRepository memberRepository;

    @Transactional
    public void coapply(ConsultingDTO consultingDTO) {
        try {
            Member member = memberRepository.findById(consultingDTO.getCon_user_id()).get();

            log.info("지원자 : " +member);

//            Optional<Consulting> conapply = consultingRepository.findByUser_id(member);

            log.info("-------------신청실행---------------");
            log.info(consultingDTO);
            Consulting consulting = dtoToEntity(consultingDTO);
            consultingRepository.save(consulting);

        } catch (Exception e){
            log.info("error12213123123" + e);
            return;
        }
    }

    //승인거절대기
    @Transactional
    public ResponseEntity conok(List<Long> consult_num, String result){
        System.out.println("consultingServiceImpl - consulting : " + consult_num.toString());
        try {
            Consulting consulting;

            for (int i=0; i<consult_num.size(); i++){
                consulting = consultingRepository.getOne(consult_num.get(i));

                if(result.equals("no")) {
                    consulting.modCon_allow(2);
                }else if(result.equals("ok")){
                    consulting.modCon_allow(0);
                }else if(result.equals("stay")){
                    consulting.modCon_allow(1);
                }
                consultingRepository.save(consulting);
            }
            return new ResponseEntity(0, HttpStatus.OK);
        } catch (Exception e){
            System.out.println("error119 : " + e);
            return new ResponseEntity(2, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public PageResultDTO<ConsultingDTO, Consulting> conlist(PageRequestDTO pageRequestDTO) {
        log.info("신청자 정보");
        Pageable pageable = pageRequestDTO.getPageable(Sort.by("cno").descending());

        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);
        Page<Consulting> result = consultingRepository.findAll(booleanBuilder,pageable);

        Function<Consulting, ConsultingDTO> fn = (entity -> entityToDto(entity));
        return new PageResultDTO<>(result, fn);
    }

    private BooleanBuilder getSearch(PageRequestDTO pageRequestDTO) {
        String type = pageRequestDTO.getType();

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        QConsulting qConsulting = QConsulting.consulting;

        String keyword = pageRequestDTO.getKeyword();

        BooleanExpression expression = qConsulting.consult_num.gt(0L);

        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0) {
            return booleanBuilder;
        }
        BooleanBuilder conditionBuilder = new BooleanBuilder();
//
        if(type.contains("t")){
            conditionBuilder.or(qConsulting.Consult_field.contains(keyword));
        }
//        if (type.contains("ch")){
//            conditionBuilder.or(qConsult.Consult_field.contains(keyword));
//        }
//        if(type.contains("n")){
//            conditionBuilder.or(qConsult.Consult_detail_field.contains(keyword));          // 내용
//        }

        booleanBuilder.and(conditionBuilder);
        return booleanBuilder;
    }
}
