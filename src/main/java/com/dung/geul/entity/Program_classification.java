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
public class Program_classification  {    // 지원프로그램 분류 테이블

    @Id
    @Column(length = 4)
    private Long pc_num;                            // 분류번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pr_pc_num",foreignKey = @ForeignKey(name="pr_pc_num_fk"))
    private Program pr_num; // userid (FK) 작성자


    @Column(length = 5, nullable = false)
    private String pc_field;                        // 영역

    @Column(length = 20, nullable = false)
    private String pc_dept;                         // 운영부서

    @Column(length = 20, nullable = true)
    private String pc_sort;                         // 분류

    @Column(length = 20, nullable = true)
    private String pc_detail;                       // 세부분류

    @Column(length = 1, nullable = true)
    private String pc_zagi;                         // 자기주도

    @Column(length = 1, nullable = true)
    private String pc_changui;                      // 창의융합

    @Column(length = 1, nullable = true)
    private String pc_zenmun;                       // 전문직무

    @Column(length = 1, nullable = true)
    private String pc_global;                       // 글로벌 리더

    @Column(length = 1, nullable = true)
    private String pc_luxury;                       // 명품, 인성

    @Column(length = 4, nullable = false)
    private String pc_b_point;                      // 백호 마일리지 획득 점수

    @Column(length = 30, nullable = true)
    private String pc_bigo;                         // 비고



}
