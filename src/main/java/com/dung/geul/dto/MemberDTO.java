package com.dung.geul.dto;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Id;
import java.time.LocalDate;

@Data
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MemberDTO {

    private String user_id;

    private String user_name;

    private String user_pw;

    private String user_ph;

    private String user_ph2;

    private String user_ph3;

    private String user_postcode;

    private String user_addr;

    private String user_addr_details;

    private String user_email;

    private String user_emailDomain;
    //

    private int user_allow;

    private String user_dept;  // 교수 소속계열, 학생소속계열

    private String user_grade;  // 학년

    private String user_class; // 교수,학생 담당반

    private String role;

    public MemberDTO(String user_id, String user_name, String user_ph, String user_ph2, String user_ph3,
                     String user_postcode, String user_addr, String user_addr_details, String user_email,
                     String user_emailDomain, int user_allow, String user_dept, String user_grade,
                     String user_class, String role) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.user_ph = user_ph;
        this.user_ph2 = user_ph2;
        this.user_ph3 = user_ph3;
        this.user_postcode = user_postcode;
        this.user_addr = user_addr;
        this.user_addr_details = user_addr_details;
        this.user_email = user_email;
        this.user_emailDomain = user_emailDomain;
        this.user_allow = user_allow;
        this.user_dept = user_dept;
        this.user_grade = user_grade;
        this.user_class = user_class;
        this.role = role;
    }



}
