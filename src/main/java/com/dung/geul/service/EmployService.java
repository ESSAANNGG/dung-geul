package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;

import com.dung.geul.dto.EnterpriseDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Enterprise;
import net.bytebuddy.asm.Advice;


public interface EmployService {

//    PageResultDTO<EmployDTO, Employ> getList(PageRequestDTO pageRequestDTO);

    PageResultDTO<EmployDTO, Object[]> getList(PageRequestDTO pageRequestDTO);

    EmployDTO read(Long num);

    Long register(EmployDTO employDTO);

    void modify(EmployDTO employDTO);

    void remove(Long num);

    default Employ dtoToEntity(EmployDTO dto) {

        Enterprise enterprise = Enterprise.builder().etp_id(dto.getEtp_id()).build();

        Employ entity = Employ.builder()
                .num(dto.getNum())
                .title(dto.getTitle())
                .content(dto.getContent())
                .ot(dto.getOt())
                .ep(dto.getEp())
                .start_date(dto.getStart_date())
                .end_date(dto.getEnd_date())
                .people(dto.getPeople())
                .career(dto.getCareer())
                .education(dto.getEducation())
                .salary(dto.getSalary())
                .area(dto.getArea())
                .apply(dto.getApply())
                .file(dto.getFile())
                .etp_id(enterprise)
                .build();
        return entity;
    }


    default EmployDTO entityToDto(Employ entity, Enterprise enterprise ){

        EmployDTO dto = EmployDTO.builder()
                .num(entity.getNum())
                .title(entity.getTitle())
                .content(entity.getContent())
                .ot(entity.getOt())
                .ep(entity.getEp())
                .start_date(entity.getStart_date())
                .end_date(entity.getEnd_date())
                .people(entity.getPeople())
                .career(entity.getCareer())
                .education(entity.getEducation())
                .salary(entity.getSalary())
                .area(entity.getArea())
                .apply(entity.getApply())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .file(entity.getFile())
                .etp_name(enterprise.getEtp_name())
                .etp_sector(enterprise.getEtp_sector())
                .etp_ph(enterprise.getEtp_ph())
                .etp_home(enterprise.getEtp_home())
                .etp_member(enterprise.getEtp_member())
                .etp_ceo_name(enterprise.getEtp_ceo_name())
                .build();

        return dto;
    }
    //getList
    default EmployDTO List(Employ entity, Enterprise enterprise ){

        EmployDTO dto = EmployDTO.builder()
                .num(entity.getNum())
                .title(entity.getTitle())
                .content(entity.getContent())
                .ot(entity.getOt())
                .ep(entity.getEp())
                .start_date(entity.getStart_date())
                .end_date(entity.getEnd_date())
                .people(entity.getPeople())
                .career(entity.getCareer())
                .education(entity.getEducation())
                .salary(entity.getSalary())
                .area(entity.getArea())
                .apply(entity.getApply())
                .regDate(entity.getRegDate())
                .modDate(entity.getModDate())
                .file(entity.getFile())
                 .etp_name(enterprise.getEtp_name())
                .build();

        return dto;
    }
}
