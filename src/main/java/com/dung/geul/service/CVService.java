package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.dto.cv.*;
import com.dung.geul.entity.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import static org.reflections.Reflections.log;

public interface CVService {

    default LocalDate dateFormat(String stringDate){

        if(stringDate != null){
            LocalDate localDate = LocalDate.parse(stringDate, DateTimeFormatter.ISO_DATE);
            return localDate;
        } else return null;

    }

    default CV CvDtoToEntity(CvPageDTO dto, Member member){

        System.out.println("이력서 dto -> entity 실행");

        // 이력서 주인 찾기

        System.out.println("이력서 주인 : " + member);

        CV cv = CV.builder()
                // 기본정보
                .user_id(member)
                .user_name(dto.getUser_name())
                .name_china(dto.getName_china())
                .birth(dto.getBirth())
                .user_age(dto.getUser_age())
                .user_hp(dto.getUser_hp())
                .user_email(dto.getUser_email())
                .addr(dto.getAddr())
                .supportPath(dto.getSupportPath())
                // 우대사항/병역
                .cv_verteran(dto.getCv_verteran())
                .cv_disability(dto.getCv_disability())
                .cv_military(dto.getCv_military())
                .cv_military_now(dto.getMilitaryServiceClassification())
                //희망조건
                .sec_of_exam(dto.getSec_of_exam())
                .desired_salary(dto.getDesired_salary())
                //취미 특기
                .cv_hobby(dto.getCv_hobby())
                .cv_specialty(dto.getCv_specialty())
                .build();

        System.out.println("이력서 entity : " + cv.toString());

        return cv;
    }


        default Awards dtoToEntity(AwardsDTO dto, Member member){

        Awards awards = Awards.builder()
                .member(member)
                .awards_des(dto.getAwards_des())
                .awards_agency(dto.getAwards_agency())
                .awards_date(dto.getAwards_date())
                .award_contents(dto.getAward_contents())
                .build();

        return awards;
    }

    default Education dtoToEntity(EducationDTO dto, Member member){

        String type = dto.getSchoolType();

        log.info("학력 dto : " + dto.toString());

        Education education = Education.builder()
                .member(member)
                .schoolType(type)
                .edc_school(dto.getEdc_school())
                .edc_date_start(dto.getDateStart())
                .edc_date_end(dto.getDateEnd())
                .edc_graduated(dto.getGraduated())
                .edc_dept(dto.getDept())
                .edc_gpa(dto.getGpa())
                .edc_ps(dto.getPs())
                .build();

        return education;
    }

    default Family dtoToEntity(FamilyDTO dto, Member member){

        Family family = Family.builder()
                .member(member)
                .fam_relation(dto.getFam_relation())
                .fam_name(dto.getFam_name())
                .fam_age(dto.getFam_age())
                .fam_birth(dto.getFam_birth())
                .fam_living(dto.getFam_living())
                .build();

        return family;
    }

    default Language dtoToEntity(LanguageDTO dto, Member member){

        Language language = Language.builder()
                .member(member)
                .fl_language(dto.getFl_language())
                .fl_name(dto.getFl_name())
                .fl_conversation(dto.getFl_conversation())
                .fl_date(dto.getFl_date())
                .fl_reading(dto.getFl_reading())
                .fl_writing(dto.getFl_writing())
                .fl_score(dto.getFl_score())
                .fl_rank(dto.getFl_rank())
                .build();

        return language;
    }

    default License dtoToEntity(CertificateDTO dto, Member member){

        License license = License.builder()
                .licNum(dto.getLic_num())
                .licName(dto.getLic_name())
                .licAgency(dto.getLic_agency())
                .licType(dto.getLic_type())
                .licDate(dto.getLic_date())
                .licDueDate(dto.getLic_due_date())
                .inCv(1)
                .member(member)
                .build();

        return license;
    }

    default Carrer dtoToEntity(CareerDTO dto, Member member){

        Carrer carrer = Carrer.builder()
                .member(member)
                .cr_etp_name(dto.getCr_etp_name())
                .cr_employment(dto.getCr_employment())
                .cr_position(dto.getCr_position())
                .cr_resignation(dto.getCr_resignation())
                .reason_resign(dto.getReason_resign())
                .cr_task(dto.getCr_task())
                .cr_task2(dto.getCr_task2())
                .Salary(dto.getSalary())
                .build();

        return carrer;
    }

    // entity to dto

    default AwardsDTO EntityToDto(Awards entity){

        AwardsDTO awardsDTO = AwardsDTO.builder()
                .id(entity.getId())
                .awards_agency(entity.getAwards_agency())
                .awards_date(entity.getAwards_date())
                .awards_des(entity.getAwards_des())
                .award_contents(entity.getAward_contents())
                .build();

        return awardsDTO;
    }

    default EducationDTO EntityToDto(Education entity){

         EducationDTO dto = EducationDTO.builder()
                 .id(entity.getEdc_ID())
                 .schoolType(entity.getSchoolType())
                 .edc_school(entity.getEdc_school())
                 .highschool_edc_date(entity.getEdc_date_end())
                .build();

         String type = dto.getSchoolType();

         if(type.equals("고등학교")){
             dto.setHighschool_edc_date(entity.getEdc_date_end());
             dto.setGraduate_edc_dept(entity.getEdc_dept());
             dto.setHighschool_edc_graduated(entity.getEdc_graduated());
         } else if(type.equals("전문대")){
             dto.setCollege_edc_date_start(entity.getEdc_date_start());
             dto.setCollege_edc_date_end(entity.getEdc_date_end());
             dto.setCollege_edc_graduated(entity.getEdc_graduated());
             dto.setCollege_edc_dept(entity.getEdc_dept());
             dto.setCollege_edc_gpa(entity.getEdc_gpa());
             dto.setCollege_edc_ps(entity.getEdc_ps());
         } else if (type.equals("대학교")){
             dto.setUniversity_edc_date_start(entity.getEdc_date_start());
             dto.setUniversity_edc_date_end(entity.getEdc_date_end());
             dto.setUniversity_edc_dept(entity.getEdc_dept());
             dto.setUniversity_edc_graduated(entity.getEdc_graduated());
             dto.setUniversity_edc_gpa(entity.getEdc_gpa());
             dto.setUniversity_edc_ps(entity.getEdc_ps());
         } else {
             dto.setGraduate_edc_date_start(entity.getEdc_date_start());
             dto.setGraduate_edc_date_end(entity.getEdc_date_end());
             dto.setGraduate_edc_dept(entity.getEdc_dept());
             dto.setGraduate_edc_graduated(entity.getEdc_graduated());
             dto.setGraduate_edc_gpa(entity.getEdc_gpa());
             dto.setGraduate_edc_ps(entity.getEdc_ps());
         }

        return dto;
    }

    default CareerDTO EntityToDto(Carrer entity){
        CareerDTO dto = CareerDTO.builder()
                .id(entity.getCr_id())
                .cr_etp_name(entity.getCr_etp_name())
                .cr_employment(entity.getCr_employment())
                .cr_resignation(entity.getCr_resignation())
                .cr_position(entity.getCr_position())
                .reason_resign(entity.getReason_resign())
                .salary(entity.getSalary())
                .cr_task(entity.getCr_task())
                .cr_task2(entity.getCr_task2())
                .build();

        return dto;
    }

    default FamilyDTO EntityToDto(Family entity){
        FamilyDTO dto = FamilyDTO.builder()
                .id(entity.getFam_num())
                .fam_num(entity.getFam_num())
                .fam_relation(entity.getFam_relation())
                .fam_name(entity.getFam_name())
                .fam_age(entity.getFam_age())
                .fam_birth(entity.getFam_birth())
                .fam_living(entity.getFam_living())
                .build();

        return dto;
    }

    default LanguageDTO EntityToDto(Language entity){
        LanguageDTO dto = LanguageDTO.builder()
                .fl_id(entity.getFl_num())
                .fl_language(entity.getFl_language())
                .fl_conversation(entity.getFl_conversation())
                .fl_reading(entity.getFl_reading())
                .fl_writing(entity.getFl_writing())
                .fl_name(entity.getFl_name())
                .fl_score(entity.getFl_score())
                .fl_rank(entity.getFl_rank())
                .fl_date(entity.getFl_date())
                .build();

        return dto;
    }

    default CertificateDTO EntityToDto(License entity){
        CertificateDTO dto = CertificateDTO.builder()
                .lic_num(entity.getLicNum())
                .lic_name(entity.getLicName())
                .lic_agency(entity.getLicAgency())
                .lic_type(entity.getLicType())
                .lic_date(entity.getLicDate())
                .lic_due_date(entity.getLicDueDate())
                .inCv(entity.getInCv())
                .build();

        return dto;
    }

    default CV modifyEntity(CvPageDTO cvPageDTO, CV cv){

        cv.setUser_name(cvPageDTO.getUser_name());
        cv.setName_china(cvPageDTO.getName_china());
        cv.setBirth(cvPageDTO.getBirth());
        cv.setUser_hp(cvPageDTO.getUser_hp());
        cv.setUser_email(cvPageDTO.getUser_email());
        cv.setAddr(cvPageDTO.getAddr());
        cv.setSupportPath(cvPageDTO.getSupportPath());
        cv.setCv_verteran(cvPageDTO.getCv_verteran());
        cv.setCv_disability(cvPageDTO.getCv_disability());
        cv.setCv_military(cvPageDTO.getCv_military());
        cv.setCv_disability_degree(cvPageDTO.getCv_disability_degree());
        cv.setCv_military_now(cvPageDTO.getMilitaryServiceClassification());
        cv.setSec_of_exam(cvPageDTO.getSec_of_exam());
        cv.setDesired_salary(cvPageDTO.getDesired_salary());
        cv.setCv_hobby(cvPageDTO.getCv_hobby());
        cv.setCv_specialty(cvPageDTO.getCv_specialty());

        return cv;
    }


    default License modifyEntity(CertificateDTO dto, License entity){

        entity.setLicName(dto.getLic_name());
        entity.setLicDate(dto.getLic_date());
        entity.setLicDueDate(dto.getLic_due_date());
        entity.setInCv(1);

        return entity;

    }
}
