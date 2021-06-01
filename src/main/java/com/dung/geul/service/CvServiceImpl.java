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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

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

        try {

            Member member = memberRepository.findById(cvPageDTO.getUser_id()).get();

            log.info("이력서 주인 : " + member);

            Optional<CV> cvOpt = cvRepository.findByUser_id(member);

            log.info("이력서 : " + cvOpt.toString());

            if (!cvOpt.isEmpty()) {
                return;
            }

            CV cv = CvDtoToEntity(cvPageDTO, member);

            log.info("이력서 엔티티 : " + cv.toString());

            cvRepository.save(cv);

//         수상경력 등록
            List<AwardsDTO> awardsList = cvPageDTO.getAwards();
            if (awardsList != null) {
                for (AwardsDTO dto : awardsList) {
                    Awards awards = dtoToEntity(dto, member);
                    awardsRepository.save(awards);
                }
            }

            // 경력 등록
            List<CareerDTO> careerList = cvPageDTO.getCareer();
            if (careerList != null) {
                for (CareerDTO dto : careerList) {
                    Carrer carrer = dtoToEntity(dto, member);
                    carrerRepository.save(carrer);
                }
            }


            //학력 등록
            List<EducationDTO> educationList = cvPageDTO.getEducation();
            if (educationList != null) {
                for (EducationDTO dto : educationList) {
                    Education education = dtoToEntity(dto, member);
                    educationRepository.save(education);
                }
            }


            // 가족사항 등록
            List<FamilyDTO> familyList = cvPageDTO.getFamily();
            if (familyList != null) {
                for (FamilyDTO dto : familyList) {
                    Family family = dtoToEntity(dto, member);
                    familyRepository.save(family);
                }
            }


            List<CertificateDTO> certificateList = cvPageDTO.getCertificate();
            if (certificateList != null) {
                for (CertificateDTO dto : certificateList) {
                    License license = dtoToEntity(dto, member);
                    licenseRepository.save(license);
                }
            }


            List<LanguageDTO> languageList = cvPageDTO.getLanguage();
            if (languageList != null) {
                for (LanguageDTO dto : languageList) {
                    Language language = dtoToEntity(dto, member);
                    languageRepository.save(language);
                }
            }
            log.info("이력서 등록 완료 ! ");
            return;

        } catch (Exception e){

            log.info("error 발생 : " + e);
            return;
        }

    }

    public CvPageDTO getCvPageDto(String user_id){

        Member member = memberRepository.findById(user_id).get();

        CV cv = cvRepository.findByUser_id(member).get();

        List<Education> educationList = educationRepository.findByMember(member);
        List<EducationDTO> educationDTOList = new ArrayList<>();
        if(educationList != null) {
            for (Education education : educationList) {
                EducationDTO dto = EntityToDto(education);
                log.info("dto : " + dto);
                educationDTOList.add(dto);
            }
        }


        List<Awards> awardsList = awardsRepository.findByMember(member);
        List<AwardsDTO> awardsDTOList = new ArrayList<>();
        if(awardsList != null){
            for (Awards awards : awardsList) {
                AwardsDTO dto = EntityToDto(awards);
                log.info("dto : " + dto);
                awardsDTOList.add(dto);
            }
        }

        List<Carrer> carrerList = carrerRepository.findByMember(member);
        List<CareerDTO> careerDTOList = new ArrayList<>();
        if(carrerList != null){
            for(Carrer c : carrerList){
                CareerDTO dto = EntityToDto(c);
                careerDTOList.add(dto);
            }
        }

        List<Family> familyList = familyRepository.findByMember(member);
        List<FamilyDTO> familyDTOList = new ArrayList<>();
        if(familyList!=null){
            for(Family f : familyList){
                FamilyDTO dto = EntityToDto(f);
                log.info("dto : " + dto);
                familyDTOList.add(dto);
            }
        }


        List<Language> languageList = languageRepository.findByMember(member);
        List<LanguageDTO> languageDTOList = new ArrayList<>();
        if(languageList != null){
            for(Language l : languageList){
                LanguageDTO dto = EntityToDto(l);
                log.info("dto : " + dto);
                languageDTOList.add(dto);
            }
        }


        List<License> licenseList = licenseRepository.findByMember(member);
        List<CertificateDTO> licenseDTOList = new ArrayList<>();
        if(licenseList != null) {
            for(License l : licenseList){
                CertificateDTO dto = EntityToDto(l);
                log.info("dto : " + dto);
                licenseDTOList.add(dto);
            }
        }


        CvPageDTO pageDTO = CvPageDTO.builder()
                .cv_id(cv.getCv_id())
                .user_id(cv.getUser_id().getUser_id())
                .user_name(cv.getUser_name())
                .user_hp(cv.getUser_hp())
                .user_email(cv.getUser_email())
                .addr(cv.getAddr())
                .cv_verteran(cv.getCv_verteran())
                .cv_disability(cv.getCv_disability())
                .cv_military(cv.getCv_military())
                .cv_disability_degree(cv.getCv_disability_degree())
                .militaryServiceClassification(cv.getCv_military_now())
                .sec_of_exam(cv.getSec_of_exam())
                .Desired_salary(cv.getDesired_salary())
                .cv_hobby(cv.getCv_hobby())
                .cv_specialty(cv.getCv_specialty())
                .awards(awardsDTOList)
                .career(careerDTOList)
                .education(educationDTOList)
                .family(familyDTOList)
                .certificate(licenseDTOList)
                .language(languageDTOList)
                .birth(cv.getBirth())
                .build();

        return pageDTO;
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
