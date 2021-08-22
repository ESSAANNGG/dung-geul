package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;

import java.util.List;

public interface LicenseService {

    PageResultDTO<CertificateDTO, License> getLicensePage(String user_id, PageRequestDTO pageRequestDTO);

    void register(CertificateDTO certificateDTO);

    CertificateDTO getCertificateDTO(String lic_num);

    void modifyLicense(CertificateDTO certificateDTO);

    void deleteLicense(String lic_num);

    List<CertificateDTO> getLicenseList(String user_id);

    default CertificateDTO entityToDto(License entity){

        System.out.println("License : " + entity);

        CertificateDTO dto = CertificateDTO.builder()
                .lic_num(entity.getLicNum())
                .lic_name(entity.getLicName())
                .lic_type(entity.getLicType())
                .lic_agency(entity.getLicAgency())
                .lic_date(entity.getLicDate())
                .lic_due_date(entity.getLicDueDate())
                .lic_file(entity.getLicFile())
                .user_id(entity.getMember().getUser_id())
                .build();

        dto.setRegDate(entity.getRegDate());

        System.out.println(entity.getRegDate());

        return dto;
    }

    default License dtoToEntity(CertificateDTO dto, Member member){

        License entity = License.builder()
                .licNum(dto.getLic_num())
                .licType(dto.getLic_type())
                .licAgency(dto.getLic_agency())
                .licName(dto.getLic_name())
                .licDate(dto.getLic_date())
                .licDueDate(dto.getLic_due_date())
                .licFile(dto.getLic_file())
                .member(member)
                .build();

        return entity;
    }
}
