package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;


import com.dung.geul.repository.EmployRepository;
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
    public PageResultDTO<EmployDTO, Employ> getList(PageRequestDTO requestDTO) {

        Pageable pageable = requestDTO.getPageable(Sort.by("num").descending());

        Page<Employ> result = employRepository.findAll(pageable);

        Function<Employ, EmployDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(result, fn);
    }

    @Override
    public EmployDTO read(Long num) {
        log.info("num :" +num);

        Optional<Employ> result = employRepository.findById(num);

        //isPresent() :저장된 값이 존재하면 true를 반환하고, 값이 존재하지 않으면 false를 반환함.
        return result.isPresent()? entityToDto(result.get()): null;
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


}