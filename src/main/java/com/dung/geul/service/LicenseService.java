package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;
import org.springframework.stereotype.Service;

@Service
public interface LicenseService {

    PageResultDTO<CertificateDTO, License> getLicensePage(PageRequestDTO pageRequestDTO);
}
