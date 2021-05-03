package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
// @Table(name="empoly")  필요없어보여서 주석처리 했음 - 정혜리
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "em_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "em_modDate"))
})
public class Employ extends BaseEntity{
    // baseEntity 추가 (채용공고 등록일, 수정일로 사용) - 정혜리

    @Id
    @Column(name = "em_num")    // 공고번호
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long num;

    @Column(name = "em_title")  // 제목
    private String title;

    @Column(name = "em_content",length = 1000)  // 내용
    private String content;

    @Column(name ="em_ot")  // 직종 구분
    private String ot;

    @Column(name ="em_ep")  // 고용 구분
    private String ep;

    @Column(name ="em_start_date")  // 시작일
    private LocalDateTime start_date;

    @Column(name ="em_end_date")    // 마감일
    private LocalDateTime end_date;

    @Column(name = "em_people") // 모집 인원
    private String people;

    @Column(name = "em_career") // 경력
    private String career;

    @Column(name = "em_education")  // 학력
    private String education;

    @Column(name = "em_salary") // 급여
    private String salary;

    @Column(name = "em_area")   // 근무 지역
    private String area;

    @Column(name = "em_apply")  // 지원 방법
    private String apply;

    @Column(name = "em_file",length = 1000) // 파일
    private String file;

    @ManyToOne
    @JoinColumn(name = "em_etp_id") // 기업 아이디
    private Enterprise enterprise;

}
