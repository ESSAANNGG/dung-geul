package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
//@ToString(exclude = {"member" , "consult"})
public class Consulting {    // 상담 테이블

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "con_user_id" ,foreignKey = @ForeignKey(name="con_user_id_fk"))
    private Member user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cno", foreignKey = @ForeignKey(name="consult_cno"))
    private Consult cno;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long consult_num;

    @Column(length = 50, nullable = false)
    private String Consult_field;

    @Column (length = 50, nullable = false)
    private String Consult_detail_field;

    @Column
    private String consult_date;                  // 상담 일자

    @Column
    private String consult_time; //신청날짜

    @Column
    private String con_user_name;

    @Column(length = 1)      //인증여부 ( 0: 인증 됨,  1: 인증 전 2: 거절 //nullable = false
    private int consult_approve;             // 승인 여부

    public void modCon_allow(int consult_approve){
        this.consult_approve= consult_approve;
    }
//    @Column(length = 1)
//    private int consult_complete;            // 완료 여부

}
