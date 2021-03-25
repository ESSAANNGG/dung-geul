package com.dung.geul.dto;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;

@Data
public class MemberDTO {

    private String user_id;

    private String user_name;

    private String user_pw;

    private int user_ph;

    private String user_addr;

    private String user_email;

    private String user_dept;  // 교수 소속계열, 학생소속계열

    private String user_class; // 교수,학생 담당반

    private String user_job; //직장

    private String role;



}
