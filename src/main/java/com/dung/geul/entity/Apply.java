package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Apply implements Serializable {
    // 입사지원테이블

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long ap_id;

    @Column(nullable = false)
    private LocalDateTime ap_date;  //지원 일자

    @Column(length = 20, nullable = false)
    private String ap_area; // 희망 근무 지역

    @Column(length = 20, nullable = false)
    private String ap_task; //희망 업무

    private String ap_pass; //서류합격유무


    // 이력서와 자소서
    @ManyToOne(fetch = FetchType.LAZY)
    private Introduce introduce;        // 자소서

    @ManyToOne(fetch = FetchType.LAZY)
    private CV cv;              // 이력서

    @ManyToOne(fetch = FetchType.LAZY)
    private Employ em_num; // 채용공고
}
