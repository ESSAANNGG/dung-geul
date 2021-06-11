package com.dung.geul.dto;

import com.dung.geul.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CvPageDTO {

    //TODO ... 지원경로 없음

    private long cv_id;

    private String user_id;

    private String user_name;

    private String name_china;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birth;

    private int user_age;

    private String addr;

    private String user_hp;

    private String user_email;

    private String supportPath;     // 지원경로

    private int cv_verteran;

    private int cv_disability;

    private int cv_military;

    private String cv_disability_degree;

    private String militaryServiceClassification;

    private String sec_of_exam;             // 응시부문

    private String Desired_salary;          // 희망 연봉

    private String cv_hobby;                 // 취미

    private String cv_specialty;             // 특기

    

    private List<CareerDTO> career;         // 경력

    private List<EducationDTO> education;   // 학력

    private List<AwardsDTO> awards;         // 수상내역

    private List<FamilyDTO> family;         // 가족사항

    private List<CertificateDTO> certificate;   // 자격

    private List<LanguageDTO> language;         // 외국어

}
