package com.dung.geul.service;

import com.dung.geul.dto.*;
import com.dung.geul.entity.*;

import java.text.DateFormat;
import java.text.ParsePosition;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

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
                .birth(dto.getBirth())
                .user_hp(dto.getUser_hp())
                .user_email(dto.getUser_email())
                // 우대사항/병역
                .cv_verteran(dto.getCv_verteran())
                .cv_disability(dto.getCv_disability())
                .cv_military(dto.getCv_military())
                //희망조건
                .sec_of_exam(dto.getSec_of_exam())
                .Desired_salary(dto.getDesired_salary())
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

        Education education = Education.builder()
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
                .lic_name(dto.getLic_name())
                .lic_date(dto.getLic_date())
                .lic_due_date(dto.getLic_due_date())
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
                .Salary(dto.getSalary())
                .build();

        return carrer;
    }


}
