package com.dung.geul.service;

import com.dung.geul.dto.CertificateDTO;
import com.dung.geul.entity.License;
import com.dung.geul.entity.Member;
import com.dung.geul.repository.LicenseRepository;
import com.dung.geul.repository.MemberRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class LicenseServiceImplTest {

    @Autowired
    private LicenseService licenseService;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Test
    void getLicenseList() {

        Member member = memberRepository.getOne("student1");

        List<License> licenseList = licenseRepository.findByMember(member);


        Function<License, CertificateDTO> fn = (entity -> licenseService.entityToDto(entity));

        List<CertificateDTO> certificateDTOList = licenseList.stream().map(fn).collect(Collectors.toList());

        System.out.println(certificateDTOList.toString());

    }
}