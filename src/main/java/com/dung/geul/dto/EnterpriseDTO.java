package com.dung.geul.dto;

import com.dung.geul.entity.Member;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class EnterpriseDTO extends MemberDTO {

    // 기업 추가 정보

    private String etp_num; //기업명

    private String etp_name; // 기업이름

    private String etp_ceo_name; // 대표자이름

    private String etp_ph; // 기업 전화번호

    private String etp_px; // 기업 팩스번호

    private String etp_home; // 기업 홈페이지

    private String etp_contents; // 주요사업내용

    private String etp_post; // 우편번호

    private String etp_detail_addr; // 상세주소

    private LocalDateTime etp_year; // 설립년도

    private int etp_member; // 직원 수

    private String etp_Sector; // 업종

    private String etp_shape; // 기업 형태

    private String etp_allow; // 인증여부

}
