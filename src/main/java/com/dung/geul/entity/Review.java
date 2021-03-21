package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Review extends BaseEntity {       // 후기 테이블

    @Id
    private Long r_num;                        // 글 번호

    @Id
    @ManyToOne
    @JoinColumn(name = "r_pr_num",foreignKey = @ForeignKey(name="r_pr_num_pfk"))
    private Program pr_num;                     // 지원프로그램 번호

    @Id
    @ManyToOne
    @JoinColumn(name = "r_cv_user_id",foreignKey = @ForeignKey(name="r_cv_user_id_pfk"))
    private CV cv_user_id;                   // 학생  // 패키지명 지움 -정혜리

    @Column(length = 255, nullable = true)
    private String r_content;                  // 내용    // 패키지명 지움 -정혜리

   /* @Column(length = 20, nullable = true)
    private LocalDate r_date;*/                       // 작성일자

}
