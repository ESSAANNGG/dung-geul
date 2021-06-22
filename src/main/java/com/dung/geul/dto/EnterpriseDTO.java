package com.dung.geul.dto;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class EnterpriseDTO extends MemberDTO {

    // 기업 추가 정보
    private Long etp_id;

    private String etp_num; //사업자번호

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

}
