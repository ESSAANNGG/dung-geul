package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EducationDTO {

    private String schoolType;
    private String edc_school;

    private String highschool_edc_date;
    private String highschool_edc_graduated;

    private String college_edc_date_start;
    private String college_edc_date_end;
    private String college_edc_graduated;
    private String college_edc_dept;
    private double college_edc_gpa;
    private double college_edc_ps;

    private String university_edc_date_start;
    private String university_edc_date_end;
    private String university_edc_graduated;
    private String university_edc_dept;
    private double university_edc_gpa;
    private double university_edc_ps;

    private String graduate_edc_date_start;
    private String graduate_edc_date_end;
    private String graduate_edc_graduated;
    private String graduate_edc_dept;
    private double graduate_edc_gpa;
    private double graduate_edc_ps;

    public String getDateStart() {
        if(schoolType.equals("전문대")){
            return college_edc_date_start;
        } else if(schoolType.equals("대학교")){
            return university_edc_date_start;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_date_start;
        } else return null;
    }

    public String getDateEnd() {
        if(schoolType.equals("고등학교")){
            return highschool_edc_date;
        } else if(schoolType.equals("전문대")){
            return college_edc_date_end;
        } else if(schoolType.equals("대학교")){
            return university_edc_date_end;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_date_end;
        } else return null;
    }

    public String getGraduated() {
        if(schoolType.equals("고등학교")){
            return highschool_edc_graduated;
        } else if(schoolType.equals("전문대")){
            return college_edc_graduated;
        } else if(schoolType.equals("대학교")){
            return university_edc_graduated;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_graduated;
        } else return null;
    }

    public String getDept() {
        if(schoolType.equals("전문대")){
            return college_edc_dept;
        } else if(schoolType.equals("대학교")){
            return university_edc_dept;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_dept;
        } else return null;
    }

    public double getGpa() {
        if(schoolType.equals("전문대")){
            return college_edc_gpa;
        } else if(schoolType.equals("대학교")){
            return university_edc_gpa;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_gpa;
        } else return 0;
    }

    public double getPs() {
        if(schoolType.equals("고등학교")){
            return college_edc_ps;
        } else if(schoolType.equals("전문대")){
            return college_edc_ps;
        } else if(schoolType.equals("대학교")){
            return university_edc_ps;
        } else if(schoolType.equals("대학원")){
            return graduate_edc_ps;
        } else return 0;
    }
}
