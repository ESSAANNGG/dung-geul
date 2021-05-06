package com.dung.geul.service;

import com.dung.geul.dto.ConsultDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.QConsult;
import com.dung.geul.entity.QEmploy;
import com.dung.geul.repository.ConsultRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class ConsultServiceImpl implements ConsultService {
    private final ConsultRepository consultRepository;

    @Override
    public Long register(ConsultDTO consultDTO) {
        Consult consult = dtoToEntity(consultDTO);
        consultRepository.save(consult);
        return consult.getCno_num();
    }

    @Override
    public PageResultDTO<ConsultDTO, Consult> getList(PageRequestDTO pageRequestDTO) {
        Pageable pageable = pageRequestDTO.getPageable(Sort.by("num").descending());
        BooleanBuilder booleanBuilder = getSearch(pageRequestDTO);
        Page<Consult> result = consultRepository.findAll(booleanBuilder, pageable);

        Function<Consult, ConsultDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }

    @Override
    public ConsultDTO read(Long cno_num) {

        Optional<Consult> result = consultRepository.findById(cno_num);
        return result.isPresent()? entityToDto(result.get()) : null;
    }

    @Override
    public void remove(Long cno_num) {
        consultRepository.deleteById(cno_num);
    }

    @Override
    public void modify(ConsultDTO consultDTO) {
        Optional<Consult> result = consultRepository.findById(consultDTO.getCno_num());

        if(result.isPresent()){
            Consult consult = result.get();

            consult.updatefiled(consultDTO.getConsult_field());
            consult.updatedetail(consultDTO.getConsult_detail_field());

            consultRepository.save(consult);
        }
    }

    private BooleanBuilder getSearch(PageRequestDTO pageRequestDTO) {
        String type = pageRequestDTO.getType();

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        QConsult qConsult = QConsult.consult;

        String keyword = pageRequestDTO.getKeyword();

        BooleanExpression expression = qConsult.cno_num.gt(0L);

        booleanBuilder.and(expression);

        if (type == null || type.trim().length() == 0) {

        }
//        BooleanBuilder conditionBuilder = new BooleanBuilder();
//
//        if (type.contains("c")){
//            conditionBuilder.or(q)
//        }
        return booleanBuilder;
    }
}