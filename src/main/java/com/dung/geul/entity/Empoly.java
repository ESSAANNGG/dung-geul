package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
// @Table(name="empoly")  필요없어보여서 주석처리 했음 - 정혜리
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "em_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "em_modDate"))
})
public class Empoly extends BaseEntity{
    // 채용공고
    // baseEntity 추가 (채용공고 등록일, 수정일로 사용) - 정혜리

    @Id
    @Column(name = "em_num")
    private Long num;

    @Column(length = 50, nullable = false)
    private String em_title;

    @Column(length = 1000,nullable = false)
    private String em_content;

    @Column(length = 1, nullable = false)
    private int em_co;

    @Column(length = 4, nullable = false)
    private String em_ot;

    @Column(length = 1, nullable = false)
    private String em_ep;

    private LocalDate em_start_date;

    private LocalDate em_end_date;

    @Column(nullable = false)
    private String em_file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "em_user_id" ,foreignKey = @ForeignKey(name="em_user_id_fk"))
    private Member user_id;
}
