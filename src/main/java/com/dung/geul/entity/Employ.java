package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class Employ extends BaseEntity{
    // baseEntity 추가 (채용공고 등록일, 수정일로 사용) - 정혜리
    // 채용공고 엔티티

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long num;

    @Column(name = "em_title")
    private String title;

    @Column(name = "em_content",length = 1000)
    private String content;

    @Column(name ="em_ot")
    private String ot;

    @Column(name ="em_ep")
    private String ep; //고용구분

    @Column(name ="em_start_date")
    private LocalDateTime start_date;

    @Column(name ="em_end_date")
    private LocalDateTime end_date;

    @Column(name = "em_people")
    private String people;

    @Column(name = "em_career")
    private String career;

    @Column(name = "em_education")
    private String education;

    @Column(name = "em_salary")
    private String salary;

    @Column(name = "em_area")
    private String area;

    @Column(name = "em_apply")
    private String apply;

    @Column(name = "em_file",length = 1000)
    private String file;

    @ManyToOne(fetch = FetchType.LAZY)
    private Enterprise etpId;

}
