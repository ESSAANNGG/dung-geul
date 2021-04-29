package com.dung.geul.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "cr_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "cr_modDate"))
})
public class Carrer extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String cr_id; // 경력 번호

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "member_user_id_fk"))
    private Member user_id;

    private String cr_etp_name;  // 회사 명

    private String cr_task; // 담당업무

    private String cr_position; //직위

    // 근무일자
    @Column(name = "cr_em")
    private LocalDate cr_employment; //입사 일자

    @Column(name = "cr_res")
    private LocalDate cr_resignation; //퇴사 일자


    private String reason_resign;   // 퇴사 사유

    private int Salary; // 연봉

}
