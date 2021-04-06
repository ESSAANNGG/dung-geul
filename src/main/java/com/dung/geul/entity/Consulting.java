package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Consulting  implements Serializable {    // 상담 테이블

    @Id
    @Column(name = "consult_num")
    private Long num;

    /*@Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consult_user_id" ,foreignKey = @ForeignKey(name="consult_user_id_pfk"))
    private Member user_id;   */                    // 아이디


    @Temporal(TemporalType.DATE)
    private Date consult_date;                  // 상담 일자

    @Column(length = 1, nullable = false)
    private String consult_approve;             // 승인 여부

    @Column(length = 1, nullable = false)
    private String consult_complete;            // 완료 여부


}
