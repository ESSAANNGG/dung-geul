package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;

import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;



public interface EmployService {

    PageResultDTO<EmployDTO, Employ> getList(PageRequestDTO pageRequestDTO);

   EmployDTO read(Long num);

   Long register(EmployDTO employDTO);

   void modify(EmployDTO employDTO);

   void remove(Long num);

    default Employ dtoToEntity(EmployDTO dto) {
        Employ entity = Employ.builder()
                .num(dto.getNum())
                .title(dto.getTitle())
                .build();

        return entity;
    }

    default EmployDTO entityToDto(Employ entity){

        EmployDTO dto = EmployDTO.builder()
                .num(entity.getNum())
                .title(entity.getTitle())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .build();

        return dto;
    }
}