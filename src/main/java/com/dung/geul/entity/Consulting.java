package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
//@ToString(exclude = {"member" , "consult"})
public class Consulting  extends BaseEntity {    // 상담 테이블

//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private Member member;
//
//    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private Consult consult;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long consult_num;
    /*@Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "consult_user_id" ,foreignKey = @ForeignKey(name="consult_user_id_pfk"))
    private Member user_id;   */                    // 아이디


    @Column
    private String consult_date;                  // 상담 일자

//    @Column
//    private LocalDateTime time;
    @Column(length = 1, nullable = true)
    private int consult_approve;             // 승인 여부

    @Column(length = 1, nullable = true)
    private String consult_complete;            // 완료 여부

}
