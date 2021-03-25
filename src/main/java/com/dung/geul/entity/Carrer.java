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
    private String cr_name; //자격증 등록번호

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cr_user_id" ,foreignKey = @ForeignKey(name="cr_user_id_fk"))
    private CV cv_user_id;

    private String cr_task; // 담당업무

    @Column(name = "cr_em")
    private LocalDate cr_employment; //입사 일자

    @Column(name = "cr_res")
    private LocalDate cr_resignation; //퇴사 일자
}
