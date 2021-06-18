package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.dto.PageRequestDTO;
import com.dung.geul.dto.PageResultDTO;
import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.LicenseRepository;
import com.dung.geul.repository.MemberRepository;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.lang.annotation.Annotation;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Log4j2
@Service
public class LicenseServiceImpl implements LicenseService{

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Override
    public PageResultDTO<CertificateDTO, License> getLicensePage(String user_id, PageRequestDTO pageRequestDTO) {

        System.out.println("getLicensePage 시작" );
        Member member = memberRepository.getOne(user_id);
        System.out.println("member : " + member);

        Pageable pageable = pageRequestDTO.getPageable(Sort.by("licNum").descending());

        Page<License> licensePage = licenseRepository.findByMember(member, pageable);

        Function<License, CertificateDTO> fn = (entity -> entityToDto(entity));

        return new PageResultDTO<>(licensePage, fn);
    }

    @Override
    public void register(CertificateDTO certificateDTO) {

        String userId = certificateDTO.getUser_id();

        log.info("user ID : " + userId);

        Member member = memberRepository.getOne(userId);

        License license = dtoToEntity(certificateDTO, member);

        licenseRepository.save(license);

    }

    @Override
    public CertificateDTO getCertificateDTO(Long lic_num) {

        License entity = licenseRepository.getOne(lic_num);

        CertificateDTO dto = entityToDto(entity);

        return dto;

    }

    @Override
    public void modifyLicense(CertificateDTO certificateDTO) {

        License license = licenseRepository.getOne(certificateDTO.getLic_num());

        license.modLicName(certificateDTO.getLic_name());
        license.modLicDate(certificateDTO.getLic_date());
        license.modLicDueDate(certificateDTO.getLic_due_date());

        licenseRepository.save(license);
    }

    @Override
    public void deleteLicense(Long lic_num) {

        licenseRepository.deleteById(lic_num);

    }

    // 이력서에 회원별 리스트 전달
    @Override
    public List<CertificateDTO> getLicenseList(String user_id) {

        Member member = memberRepository.getOne(user_id);

        List<License> licenseList = licenseRepository.findByMember(member);

        log.info("자격증 리스트 : " + licenseList.toString());

        Function<License, CertificateDTO> fn = (entity -> entityToDto(entity));

        List<CertificateDTO> certificateDTOList = licenseList.stream().map(fn).collect(Collectors.toList());

        log.info("자격증DTO 리스트 : " + certificateDTOList.toString());

        return certificateDTOList;
    }
}
