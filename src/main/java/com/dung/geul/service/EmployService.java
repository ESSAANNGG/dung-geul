package com.dung.geul.service;

import com.dung.geul.dto.EmployDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.Employ;
import com.dung.geul.entity.Enterprise;

import java.util.List;


public interface EmployService {

//    PageResultDTO<EmployDTO, Employ> getList(PageRequestDTO pageRequestDTO);

    PageResultDTO<EmployDTO, Object[]> getList(PageRequestDTO pageRequestDTO);

    List<EmployDTO> getListByMember(String user_id);        // 회원별 등록한 채용 공고 리스트 보여주기

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
                .cont(dto.getCont())
                .etpId(enterprise)
                .build();
        return entity;
    }


    default EmployDTO entityToDto(Employ entity, Enterprise enterprise){

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
                .cont(entity.getCont())
                .etp_id(enterprise.getEtp_id())
                .etp_name(enterprise.getEtp_name())
                .etp_sector(enterprise.getEtp_sector())
                .etp_ph(enterprise.getEtp_ph())
                .etp_ph2(enterprise.getEtp_ph2())
                .etp_ph3(enterprise.getEtp_ph3())
                .etp_home(enterprise.getEtp_home())
                .etp_member(enterprise.getEtp_member())
                .etp_ceo_name(enterprise.getEtp_ceo_name())
                .etp_fx(enterprise.getEtp_fx())
                .etp_shape(enterprise.getEtp_shape())
                .etp_home(enterprise.getEtp_home())
                .build();

        return dto;
    }

    default EmployDTO entityToDto(Employ entity, Enterprise enterprise, Long count){

        EmployDTO dto = entityToDto(entity, enterprise);

        dto.setApplyCount(count);

        return dto;
    }

    //getList
    default EmployDTO List(Employ entity, Enterprise enterprise ){

        System.out.println("Enterprise : " + enterprise);

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
                .cont(entity.getCont())
                .etp_name(enterprise.getEtp_name())
                .build();

        return dto;
    }
}
