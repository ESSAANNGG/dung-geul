package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;

public interface LicenseService {

    PageResultDTO<CertificateDTO, License> getLicensePage(String user_id, PageRequestDTO pageRequestDTO);

    void register(CertificateDTO certificateDTO);

    default CertificateDTO entityToDto(License entity){

        CertificateDTO dto = CertificateDTO.builder()
                .lic_num(entity.getLicNum())
                .lic_name(entity.getLicName())
                .lic_date(entity.getLicDate())
                .lic_due_date(entity.getLicDueDate())
                .regDate(entity.getRegDate())
                .build();

        return dto;
    }

    default License dtoToEntity(CertificateDTO dto, Member member){

        License entity = License.builder()
                .licName(dto.getLic_name())
                .licDate(dto.getLic_date())
                .licDueDate(dto.getLic_due_date())
                .member(member)
                .build();

        return entity;
    }
}
