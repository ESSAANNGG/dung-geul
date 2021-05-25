package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = {"member" , "consult"})
public class Consulting  extends BaseEntity {    // 상담 테이블

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long consult_num;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    private Consult consult;

    /*@Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consult_user_id" ,foreignKey = @ForeignKey(name="consult_user_id_pfk"))
    private Member user_id;   */                    // 아이디


    @Temporal(TemporalType.DATE)
    private Date consult_date;                  // 상담 일자

    @Column(length = 1)
    private int consult_approve;             // 승인 여부

    @Column(length = 1, nullable = false)
    private String consult_complete;            // 완료 여부

}
