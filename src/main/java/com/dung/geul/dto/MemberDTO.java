package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
@ToString
@AllArgsConstructor
public class MemberDTO {

    private String user_id;

    private String user_name;

    private String user_pw;

    private String user_ph;

    private String user_postcode;

    private String user_addr;

    private String user_addr_details;

    private String user_email;

    private String user_dept;  // 교수 소속계열, 학생소속계열

    private String user_grade;  // 학년

    private String user_class; // 교수,학생 담당반

    private String user_job; //직장

    private String role;



}
