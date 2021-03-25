package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Program_applicant  {    // 지원프로그램신청자 테이블

    @Id
    @ManyToOne
    @JoinColumn(name = "pa_pr_num",foreignKey = @ForeignKey(name="pa_pr_num_pfk"))
    private Program pr_num;                      // 아이디

    @Id
    @ManyToOne
    @JoinColumn(name = "pa_cv_pr_user_id",foreignKey = @ForeignKey(name="pa_cv_pr_user_id_pfk"))
    private CV cv_user_id;                   //아이디   //패키지명 지움 - 정혜리

    @Temporal(TemporalType.DATE)
    @CreatedDate                                    // 신청일 자동으로 값 넣는거 추가 - 정혜리
    private LocalDate pa_date;                    // 신청일

    @Column(length = 1, nullable = false)
    private Long pa_complete;               // 완료 여부

    @Column(length = 1000, nullable = false)
    private String pa_file;                   // 수료파일


}
