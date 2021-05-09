package com.dung.geul.dto;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class EnterpriseDTO extends MemberDTO {

    // 기업 추가 정보
    private int etp_id;

    private String etp_num; //기업명

    private String etp_name; // 기업이름

    private String etp_ceo_name; // 대표자이름

    private String etp_ph; // 기업 전화번호  1

    private String etp_ph2; // 기업 전화번호  2

    private String etp_ph3; // 기업 전화번호  3

    private String etp_fx; // 기업 팩스번호

    private String etp_home; // 기업 홈페이지

    private String etp_contents; // 주요사업내용

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate etp_year; // 설립년도

    private int etp_member; // 직원 수

   private String etp_sector; // 업종

    // 이거 두개는 나중에 변경하는거임 (관리자가 수동으로)
    private String etp_shape; // 기업 형태 : 대기업, 중소기업

    private String etp_allow; // 인증여부


    @Builder
    public EnterpriseDTO(String user_id, String user_name, String user_pw,
                         String user_ph, String user_ph2, String user_ph3, String user_postcode, String user_addr,
                         String user_addr_details, String user_email, String user_emailDomain, String user_dept,
                         String user_grade, String user_class, String user_job, String role, int etp_id,
                         String etp_num, String etp_name, String etp_ceo_name, String etp_ph,
                         String etp_fx, String etp_home, String etp_contents, LocalDate etp_year,
                         int etp_member, String etp_sector, String etp_shape, String etp_allow) {
        super(user_id, user_name, user_pw, user_ph,user_ph2,user_ph3, user_postcode, user_addr, user_addr_details,
                user_email,user_emailDomain, user_dept, user_grade, user_class, user_job, role);

        this.etp_id = etp_id;
        this.etp_num = etp_num;
        this.etp_name = etp_name;
        this.etp_contents = etp_contents;
        this.etp_ceo_name = etp_ceo_name;
        this.etp_fx = etp_fx;
        this.etp_home = etp_home;
        this.etp_member = etp_member;
        this.etp_ph = etp_ph;
        this.etp_sector = etp_sector;
        this.etp_shape = etp_shape;
        this.etp_year = etp_year;
        this.etp_allow = etp_allow;
    }
}
