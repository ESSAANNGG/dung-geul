package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.entity.*;
import com.dung.geul.repository.*;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Log4j2
public class CvServiceImpl implements CVService {

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
    public int register(CvPageDTO cvPageDTO) {

        try {

            Member member = memberRepository.findById(cvPageDTO.getUser_id()).get();

            log.info("이력서 주인 : " + member);

            Optional<CV> cvOpt = cvRepository.findByUser_id(member);

            log.info("이력서 : " + cvOpt.toString());

            if (!cvOpt.isEmpty()) {
                throw new Exception();
            }

            CV cv = CvDtoToEntity(cvPageDTO, member);

            log.info("이력서 엔티티 : " + cv.toString());

            cvRepository.save(cv);

//         수상경력 등록
            List<AwardsDTO> awardsList = cvPageDTO.getAwards();
            if (awardsList.size() > 0) {
                for (AwardsDTO dto : awardsList) {
                    Awards awards = dtoToEntity(dto, member);
                    awardsRepository.save(awards);
                }
            }

            // 경력 등록
            List<CareerDTO> careerList = cvPageDTO.getCareer();
            if (careerList.size() > 0) {
                for (CareerDTO dto : careerList) {
                    Carrer carrer = dtoToEntity(dto, member);
                    carrerRepository.save(carrer);
                }
            }


            //학력 등록
            List<EducationDTO> educationList = cvPageDTO.getEducation();
            if (educationList.size() > 0) {
                for (EducationDTO dto : educationList) {
                    Education education = dtoToEntity(dto, member);
                    educationRepository.save(education);
                }
            }


            // 가족사항 등록
            List<FamilyDTO> familyList = cvPageDTO.getFamily();
            if (familyList.size() > 0) {
                for (FamilyDTO dto : familyList) {
                    Family family = dtoToEntity(dto, member);
                    familyRepository.save(family);
                }
            }


            List<CertificateDTO> certificateList = cvPageDTO.getCertificate();
            if (certificateList.size() > 0) {
                for (CertificateDTO dto : certificateList) {
                    License license = dtoToEntity(dto, member);
                    licenseRepository.save(license);

                }
            }


            List<LanguageDTO> languageList = cvPageDTO.getLanguage();
            if (languageList.size() > 0) {
                for (LanguageDTO dto : languageList) {
                    Language language = dtoToEntity(dto, member);
                    languageRepository.save(language);
                }
            }

            log.info("이력서 등록 완료 ! ");

            return 1;

        } catch (Exception e) {

            log.info("error 발생 : " + e);
            return 0;
        }

    }

    public CvPageDTO getCvPageDto(String user_id) {

        Member member = memberRepository.findById(user_id).get();

        CV cv = cvRepository.findByUser_id(member).get();

        log.info("cv id : " + cv.getCv_id());

        CvPageDTO pageDTO = CvPageDTO.builder()
                .cv_id(cv.getCv_id())
                .user_id(cv.getUser_id().getUser_id())
                .user_name(cv.getUser_name())
                .user_hp(cv.getUser_hp())
                .user_email(cv.getUser_email())
                .addr(cv.getAddr())
                .supportPath(cv.getSupportPath())
                .cv_verteran(cv.getCv_verteran())
                .cv_disability(cv.getCv_disability())
                .cv_military(cv.getCv_military())
                .cv_disability_degree(cv.getCv_disability_degree())
                .militaryServiceClassification(cv.getCv_military_now())
                .sec_of_exam(cv.getSec_of_exam())
                .desired_salary(cv.getDesired_salary())
                .cv_hobby(cv.getCv_hobby())
                .cv_specialty(cv.getCv_specialty())
                .birth(cv.getBirth())
                .user_age(cv.getUser_age())
                .build();

        List<Education> educationList = educationRepository.findByMember(member);

        log.info("학력 : " + educationList.toString());
        log.info("학력 사이즈 : " + educationList.size());
        log.info("학력 empty: " + educationList.isEmpty());
        if (educationList.size() > 0) {
            List<EducationDTO> educationDTOList = new ArrayList<>();
            for (Education education : educationList) {
                if (education.getSchoolType() == "" || education.getSchoolType() == null) {
                    continue;
                }
                EducationDTO dto = EntityToDto(education);
                log.info("dto : " + dto);
                educationDTOList.add(dto);
            }
            pageDTO.setEducation(educationDTOList);
        }

        List<Awards> awardsList = awardsRepository.findByMember(member);
        if (awardsList.size() > 0) {
            List<AwardsDTO> awardsDTOList = new ArrayList<>();
            for (Awards awards : awardsList) {
                if (awards.getAwards_des() == "" || awards.getAwards_des() == null) {
                    continue;
                }
                AwardsDTO dto = EntityToDto(awards);
                log.info("dto : " + dto);
                awardsDTOList.add(dto);
            }
            pageDTO.setAwards(awardsDTOList);
        }

        List<Carrer> carrerList = carrerRepository.findByMember(member);
        if (carrerList.size() > 0) {
            List<CareerDTO> careerDTOList = new ArrayList<>();
            for (Carrer c : carrerList) {
                if (c.getCr_etp_name() == "" || c.getCr_etp_name() == null) {
                    continue;
                }
                CareerDTO dto = EntityToDto(c);
                careerDTOList.add(dto);
            }
            pageDTO.setCareer(careerDTOList);
        }

        List<Family> familyList = familyRepository.findByMember(member);
        if (familyList.size() > 0) {
            List<FamilyDTO> familyDTOList = new ArrayList<>();
            for (Family f : familyList) {
                if (f.getFam_relation() == "" || f.getFam_relation() == null) {
                    continue;
                }
                FamilyDTO dto = EntityToDto(f);
                log.info("dto : " + dto);
                familyDTOList.add(dto);
            }
            pageDTO.setFamily(familyDTOList);
        }


        List<Language> languageList = languageRepository.findByMember(member);
        if (languageList.size() > 0) {
            List<LanguageDTO> languageDTOList = new ArrayList<>();
            for (Language l : languageList) {
                if (l.getFl_name() == "" || l.getFl_name() == null) {
                    continue;
                }
                LanguageDTO dto = EntityToDto(l);
                log.info("dto : " + dto);
                languageDTOList.add(dto);
            }
            pageDTO.setLanguage(languageDTOList);
        }

        List<License> licenseList = licenseRepository.findByMember(member);

        if (licenseList.size() > 0) {
            List<CertificateDTO> licenseDTOList = new ArrayList<>();
            for (License l : licenseList) {
                if (l.getLic_name() == "" || l.getLic_name() == null) {
                    continue;
                }

                CertificateDTO dto = EntityToDto(l);
                log.info("dto : " + dto);
                licenseDTOList.add(dto);
            }
            pageDTO.setCertificate(licenseDTOList);
        }

        return pageDTO;
    }


    public int modify(CvPageDTO cvPageDTO) {

        log.info("modify 시작 dto : " +cvPageDTO);
        try {

            Optional<CV> cvOpt = cvRepository.findById(cvPageDTO.getCv_id());

            if (!cvOpt.isEmpty()) {

                CV cv = cvOpt.get();

                Member member = cv.getUser_id();

                cv = modifyEntity(cvPageDTO, cv);
                cvRepository.save(cv);

                List<EducationDTO> educationDTOList = cvPageDTO.getEducation();
                List<CareerDTO> careerDTOList = cvPageDTO.getCareer();
                List<AwardsDTO> awardsDTOList = cvPageDTO.getAwards();
                List<FamilyDTO> familyDTOList = cvPageDTO.getFamily();
                List<CertificateDTO> certificateDTOList = cvPageDTO.getCertificate();
                List<LanguageDTO> languageDTOList = cvPageDTO.getLanguage();

                for (EducationDTO dto : educationDTOList) {
                    Education entity = educationRepository.getOne(dto.getId());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    educationRepository.save(entity);
                }

                for (CareerDTO dto : careerDTOList) {
                    Carrer entity = carrerRepository.getOne(dto.getId());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    carrerRepository.save(entity);
                }

                for (AwardsDTO dto : awardsDTOList) {
                    Awards entity = awardsRepository.getOne(dto.getId());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    awardsRepository.save(entity);
                }

                for (FamilyDTO dto : familyDTOList) {
                    Family entity = familyRepository.getOne(dto.getId());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    familyRepository.save(entity);
                }

                for (CertificateDTO dto : certificateDTOList) {
                    License entity = licenseRepository.getOne(dto.getLic_num());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    licenseRepository.save(entity);
                }

                for (LanguageDTO dto : languageDTOList) {
                    Language entity = languageRepository.getOne(dto.getFl_id());
                    if(entity == null){
                        entity = dtoToEntity(dto, member);
                    }
                    entity = modifyEntity(dto, entity);
                    languageRepository.save(entity);
                }

                log.info("수정 완료");
                return 1;
            }
            else{
                return 0;
            }


        } catch (Exception e) {
            log.info("error : " + e);
            return 0;
        }

    }

    @Transactional
    public ResponseEntity delete(String user_id) {

        try{
            Optional<Member> member = memberRepository.findById(user_id);

            Member m = member.get();

            Optional<CV> cv = cvRepository.findByUser_id(m);

            cvRepository.delete(cv.get());

            log.info("이력서 삭제 성공: " + cv.get());

            List<Education> education = educationRepository.findByMember(m);
            List<Awards> awards = awardsRepository.findByMember(m);
            List<Family> family = familyRepository.findByMember(m);
            List<License> license = licenseRepository.findByMember(m);
            List<Language> language = languageRepository.findByMember(m);
            List<Carrer> carrer = carrerRepository.findByMember(m);

            if(!education.isEmpty()){
                for(Education e : education){
                    educationRepository.delete(e);
                    log.info("학력 삭제 성공: " + e);
                }

            }

            if(!awards.isEmpty()){
                for(Awards e : awards){
                    awardsRepository.delete(e);
                    log.info("수상내역 삭제 성공: " + e);
                }
            }

            if(!family.isEmpty()){
                for(Family e : family){
                    familyRepository.delete(e);
                    log.info("가족사항 삭제 성공: " + e);
                }
            }

            if(!license.isEmpty()){
                for(License e : license){
                    licenseRepository.delete(e);
                    log.info("자격증 삭제 성공: " + e);
                }
            }

            if(!language.isEmpty()){
                for(Language e : language){
                    languageRepository.delete(e);
                    log.info("어학능력 삭제 성공: " + e);
                }
            }

            if(!carrer.isEmpty()){
                for(Carrer e : carrer){
                    carrerRepository.delete(e);
                    log.info("경력 삭제 성공: " + e);
                }
            }

            return new ResponseEntity(HttpStatus.OK);

        }catch (Exception e){
            System.out.println("Cvservice - delete error : " + e);

            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
