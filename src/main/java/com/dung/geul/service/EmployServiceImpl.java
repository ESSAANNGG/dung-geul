package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;


import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.QEmploy;
import com.dung.geul.entity.QEnterprise;
import com.dung.geul.repository.EmployRepository;


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

@Log4j2
@Service
@RequiredArgsConstructor
public class EmployServiceImpl implements EmployService {

    private final EmployRepository employRepository;


    @Override
//    public PageResultDTO<EmployDTO, Employ> getList(PageRequestDTO requestDTO) {
        public PageResultDTO<EmployDTO, Object[]> getList(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("num").descending());

        BooleanBuilder booleanBuilder = getSearch(requestDTO); //검색 조건처리

//        Page<Employ> result = employRepository.findAll(booleanBuilder, pageable);

        Function<Object[], EmployDTO> fn = (en -> entityToDto((Employ)en[0],(Enterprise)en[1]));

        Page<Object[]> result = employRepository.getEmployWithEnterprise(requestDTO.getPageable(Sort.by("num").descending()));

//        Function<Employ, EmployDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }

    @Override
    public EmployDTO read(Long num) {
        log.info("num :" +num);

//        Optional<Employ> result = employRepository.findById(num);
//
//        //isPresent() :저장된 값이 존재하면 true를 반환하고, 값이 존재하지 않으면 false를 반환함.
//        return result.isPresent()? entityToDto(result.get()): null;

        Object result = employRepository.getEmployWithEnterprise(num);

        Object[] arr = (Object[])result;

        return entityToDto((Employ)arr[0], (Enterprise)arr[1]);
    }


    @Override
    public Long register(EmployDTO employDTO) {

        Employ employ = dtoToEntity(employDTO);

        employRepository.save(employ);

        return employ.getNum();
    }

    @Override
    public void modify(EmployDTO employDTO) {

        Employ employ = dtoToEntity(employDTO);

        employRepository.save(employ);

    }

    @Override
    public void remove(Long num) {

        employRepository.deleteById(num);

    }


    private BooleanBuilder getSearch(PageRequestDTO requestDTO){

        String type = requestDTO.getType();

        BooleanBuilder booleanBuilder = new BooleanBuilder();

        QEmploy qEmploy = QEmploy.employ;

        String keyword = requestDTO.getKeyword();

        BooleanExpression expression = qEmploy.num.gt(0L);

        booleanBuilder.and(expression);

        if(type == null || type.trim().length() == 0) {

            return booleanBuilder;
        }

        //검색 조건을 작성하기
        BooleanBuilder conditionBuilder = new BooleanBuilder();

        if(type.contains("t")){
            conditionBuilder.or(qEmploy.title.contains(keyword)); //제목
        }
        if(type.contains("ot")){
            conditionBuilder.or(qEmploy.ot.contains(keyword));  //직종
        }
        if(type.contains("ep")){
            conditionBuilder.or(qEmploy.ep.contains(keyword));  //고용구분
        }
        if(type.contains("area")){
            conditionBuilder.or(qEmploy.area.contains(keyword));  //근무지역
        }

        booleanBuilder.and(conditionBuilder);

        return booleanBuilder;

    }

}