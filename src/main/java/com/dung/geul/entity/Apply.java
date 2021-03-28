package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Apply implements Serializable {
    // 입사지원테이블

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ap_em_num")
    private Empoly em_num; // Empoly 앞에 패키지명이 붙어있길래 지움 - 정혜리

    @Column(nullable = false)
    private LocalDate ap_date;  //지원 일자

    @Column(length = 5)
    private Long ap_ds; // 회망 연봉

    @Column(length = 20)
    private String ap_area; // 희망 근무 지역

    @Column(length = 20)
    private String ap_task; //희망 업무

    @Column(length = 1,nullable = false)
    private Long ap_pass; //서류합격유무

}
