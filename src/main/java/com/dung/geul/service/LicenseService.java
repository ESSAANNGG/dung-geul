package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;

public interface LicenseService {

    PageResultDTO<CertificateDTO, License> getLicensePage(String user_id, PageRequestDTO pageRequestDTO);

    default CertificateDTO entityToDto(License entity){
        CertificateDTO dto = CertificateDTO.builder()
                .lic_num(entity.getLicNum())
                .lic_name(entity.getLicName())
                .lic_date(entity.getLicDate())
                .lic_due_date(entity.getLicDueDate())
                .build();

        return dto;
    }

}
