package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
//@ToString(exclude = {"member" , "consult"})
public class Consulting {    // 상담 테이블

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Consult consult;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long consult_num;

    @Column
    private String consult_date;                  // 상담 일자

    @Column
    private String consult_time; //신청날짜

    @Column(length = 1)      //인증여부 ( 1: 인증 됨, Null : 인증 전) //nullable = false
    private int consult_approve;             // 승인 여부

    @Column(length = 1)
    private String consult_complete;            // 완료 여부

}
