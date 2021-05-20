package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.IntroduceDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Enterprise;
import com.dung.geul.entity.Introduce;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.IntroduceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@RequiredArgsConstructor
@Log4j2
public class IntroduceServiceImpl implements IntroduceService {

    private final IntroduceRepository introduceRepository;

    @Override
    public Long register(IntroduceDTO introduceDTO) {

        log.info(introduceDTO);

       Introduce introduce = dtoToEntity(introduceDTO);

       introduceRepository.save(introduce);

       return introduce.getNum();


    }

    @Override
    public PageResultDTO<IntroduceDTO, Object[]> getList(PageRequestDTO pageRequestDTO) {


        Function<Object[], IntroduceDTO> fn = (en -> List((Introduce)en[0], (Member) en[1] ));
        Page<Object[]> result = introduceRepository.Introsearchpage(
                pageRequestDTO.getType(),
                pageRequestDTO.getKeywords(),
                pageRequestDTO.getPageable(Sort.by("num").descending()) );

        return new PageResultDTO<>(result , fn);

    }

    @Override
    public IntroduceDTO read(Long num) {
        log.info("num :" +num);

        Object result = introduceRepository.getIntroduceList(num);

        Object[] arr = (Object[])result;

        return entityToDTO((Introduce) arr[0], (Member) arr[1]);
    }

    @Override
    public void modify(IntroduceDTO introduceDTO) {

        Introduce introduce = dtoToEntity(introduceDTO);

        introduceRepository.save(introduce);

    }

    @Override
    public void remove(Long num) {

        introduceRepository.deleteById(num);

    }
}
