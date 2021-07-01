package com.dung.geul.dto.apply;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class ApplyStudentDTO {

    private Long etp_id;               // 기업 pk
    private String etp_num;             // 사업자번호
    private String etp_name;            // 기업 이름
    private String etp_shape;

    private Long emp_num;           // 채용공고 pk
    private String emp_title;        // 채용공고 제목
    private String emp_content;     // 채용공고 내용

    private Long cv_id;           //이력서 pk
    private Long intro_num;       // 자소서 pk

    private String user_name;       // 지원한 회원 이름
    private String user_id;         // 지원한 회원 아이디

    private Long ap_id;             // Apply pk
    private String ap_date;         // 지원일자
    private String ap_pass;            // 합격 여부
    private String ap_area;         // 희망 근무 지역
    private String ap_task;          //희망 업무

    //  지원자명 아이디 공고제목 기업명 기업형태 합격여부 지원일자

    @QueryProjection
    public ApplyStudentDTO(String user_name,
                           String user_id,
                           Long emp_num,
                           String emp_title,
                           Long etp_id,
                           String etp_num,
                           String etp_name,
                           String etp_shape,
                           String ap_pass,
                           String ap_date,
                           Long cv_id,
                           Long intro_num
    ){
        this.user_name = user_name;
        this.user_id = user_id;
        this.emp_num = emp_num;
        this.emp_title = emp_title;
        this.etp_id = etp_id;
        this.etp_num = etp_num;
        this.etp_name = etp_name;
        this.etp_shape = etp_shape;
        this.ap_pass = ap_pass;
        this.ap_date = ap_date;
        this.cv_id = cv_id;
        this.intro_num = intro_num;
    }


}
