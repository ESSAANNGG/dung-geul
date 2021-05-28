package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.entity.*;
import com.dung.geul.repository.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.cert.Certificate;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class CvServiceImpl implements CVService{

    @Autowired
    private CvRepository cvRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private AwardsRepository awardsRepository;

    @Autowired
    private CarrerRepository carrerRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private FamilyRepository familyRepository;

    @Autowired
    private LicenseRepository licenseRepository;

    @Autowired
    private LanguageRepository languageRepository;

    // 이력서 등록
    @Transactional
    public void register(CvPageDTO cvPageDTO){

        Member member = memberRepository.findById(cvPageDTO.getUser_id()).get();

        log.info("이력서 주인 : " + member.toString());

        Optional<CV> cvOpt = cvRepository.findByUser_id(member);

        log.info("이력서 : " + cvOpt.toString());

        if(!cvOpt.isEmpty()){ return; }

        CV cv = CvDtoToEntity(cvPageDTO, member);

        log.info("이력서 엔티티 : " + cv.toString());

        cvRepository.save(cv);

//         수상경력 등록
        List<AwardsDTO> awardsList = cvPageDTO.getAwards();
        for(AwardsDTO dto : awardsList) {
            Awards awards = dtoToEntity(dto, member);
            awardsRepository.save(awards);
        }

        // 경력 등록
        List<CareerDTO> careerList = cvPageDTO.getCareer();
        for(CareerDTO dto : careerList) {
            Carrer carrer = dtoToEntity(dto, member);
            carrerRepository.save(carrer);
        }

        //학력 등록
        List<EducationDTO> educationList = cvPageDTO.getEducation();
        for(EducationDTO dto : educationList){
            Education education = dtoToEntity(dto, member);
            educationRepository.save(education);
        }

        // 가족사항 등록
        List<FamilyDTO> familyList = cvPageDTO.getFamily();
        for(FamilyDTO dto : familyList) {
            Family family = dtoToEntity(dto, member);
            familyRepository.save(family);
        }

        List<CertificateDTO> certificateList = cvPageDTO.getCertificate();
        for(CertificateDTO dto : certificateList){
            License license = dtoToEntity(dto, member);
            licenseRepository.save(license);
        }

        List<LanguageDTO> languageList = cvPageDTO.getLanguage();
        for(LanguageDTO dto : languageList) {
            Language language = dtoToEntity(dto, member);
            languageRepository.save(language);
        }

        log.info("이력서 등록 완료 ! ");

    }


    public void modify(CvPageDTO cvPageDTO){

        CV cv = cvRepository.getOne(cvPageDTO.getCv_id());

        if(cv != null){
            // 수정할 사항들

            cvRepository.save(cv);
        }

    }

    public void delete(Long cv_id){

        System.out.println("cv_id : " + cv_id);

        cvRepository.deleteById(cv_id);

    }
}
