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
    @JoinColumn(name = "con_user_id" ,foreignKey = @ForeignKey(name="con_user_id_fk"))
    private Member user_id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "cno", foreignKey = @ForeignKey(name="consult_cno"))
    private Consult consult;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consult_num;

    @Column
    private String Consult_field;

    @Column
    private String Consult_detail_field;

    @Column
    private String consult_date;                  // 상담 일자

    @Column
    private String consult_time; //신청날짜

    @Column(length = 1)      //인증여부 ( 1: 인증 됨, Null : 인증 전) //nullable = false
    private int consult_approve;             // 승인 여부

    @Column(length = 1)
    private int consult_complete;            // 완료 여부

}
