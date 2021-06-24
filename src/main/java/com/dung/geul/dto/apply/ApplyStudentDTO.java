package com.dung.geul.dto.apply;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ApplyStudentDTO {

    private Long etp_id;               // 기업 pk
    private String etp_num;
    private String etp_name;            // 기업 이름

    private Long emp_num;           // 채용공고 pk
    private String emp_title;        // 채용공고 제목
    private String emp_content;     // 채용공고 내용

    private Long cv_id;           //이력서 pk
    private Long intro_num;       // 자소서 pk

    private String user_name;       // 회원 이름
    private String user_id;         // 지원한 회원

    private String ap_date;         // 지원일자
    private String ap_pass;            // 합격 여부
    private String ap_area;         // 희망 근무 지역
    private String ap_task;          //희망 업무


}
