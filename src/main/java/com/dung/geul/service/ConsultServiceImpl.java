package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.QConsult;
import com.dung.geul.repository.ConsultRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Function;

@Service
@Log4j2
public class ConsultServiceImpl implements ConsultService {
    @Autowired
    private ConsultRepository consultRepository;

    @Transactional
    public void register(ConsultDTO consultDTO) {
        try {
            log.info("-----------등록실행---------------");
            log.info(consultDTO);
            Consult consult = dtoToEntity(consultDTO);
            consultRepository.save(consult);

        } catch (Exception e){
            log.info("error12213123123" + e);
            return;
        }
    }
    @Override
    public PageResultDTO<ConsultDTO, Consult> getList(PageRequestDTO requestDTO) {
    log.info("getList 실행 상담부분");
    Pageable pageable = requestDTO.getPageable(Sort.by("cno").descending());
//    Page<Consult> result = consultRepository.findAll(pageable);
    BooleanBuilder booleanBuilder = getSearch(requestDTO);
    Page<Consult> result = consultRepository.findAll(booleanBuilder,pageable);

    Function<Consult, ConsultDTO> fn = (entity -> entityToDto(entity));

    return  new PageResultDTO<>(result,fn);

//    PageRequestDTO pageRequestDTO = new PageRequestDTO(page1);
//    Pageable pageable = pageRequestDTO.getPageable(Sort.by("cno_num"));
//    Function<Object[], ConsultDTO> fn = (entity -> entityToDto(Consult));
//
//    Page<Consult> result;
//
//    if (type.equals("CONSULT")){
//        result = consultRepository.findAll(pageable);
//    }
//        Pageable pageable = pageRequestDTO.getPageable(Sort.by("cno_num").descending());
//        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);
//        Page<Consult> result = consultRepository.findAll(booleanBuilder, pageable);
//
//        Function<Consult, ConsultDTO> fn = (entity-> entityToDto(entity));
//
//        return new PageResultDTO<>(result, fn);
    }

    @Override
    public ConsultDTO read(Long cno) {

        Optional<Consult> result = consultRepository.findById(cno);
        return result.isPresent()? entityToDto(result.get()) : null;
    }

    @Override
    public void remove(Long cno) {
        consultRepository.deleteById(cno);
    }

    @Override
    public void modify(ConsultDTO consultDTO) {
        Optional<Consult> result = consultRepository.findById(consultDTO.getCno());

        if(result.isPresent()){
            Consult consult = result.get();

            consult.updatefiled(consultDTO.getType());
            consult.updatedetail(consultDTO.getName());

            consultRepository.save(consult);
        }
    }

    private BooleanBuilder getSearch(PageRequestDTO pageRequestDTO) {
        String type = pageRequestDTO.getType();

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        QConsult qConsult = QConsult.consult;

        String keyword = pageRequestDTO.getKeyword();

        BooleanExpression expression = qConsult.cno.gt(0L);

        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0) {
            return booleanBuilder;
        }
        BooleanBuilder conditionBuilder = new BooleanBuilder();

        if(type.contains("t")){
            conditionBuilder.or(qConsult.Consult_field.contains(keyword));
        }
        if (type.contains("t")){
            conditionBuilder.or(qConsult.Consult_field.contains(keyword));
        }
        if (type.contains("t")){
            conditionBuilder.or(qConsult.Consult_field.contains(keyword));
        }
        if(type.contains("c")){
            conditionBuilder.or(qConsult.Consult_detail_field.contains(keyword));          // 내용
        }

        booleanBuilder.and(conditionBuilder);
        return booleanBuilder;
    }
}