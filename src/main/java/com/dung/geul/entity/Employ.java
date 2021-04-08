package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;


@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
// @Table(name="empoly")  필요없어보여서 주석처리 했음 - 정혜리
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "em_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "em_modDate"))
})
public class Employ extends BaseEntity{
    // baseEntity 추가 (채용공고 등록일, 수정일로 사용) - 정혜리

    @Id
    @Column(name = "em_num")
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long num;

    @Column(name = "em_name", length = 100)
    private String name;

    @Column(name = "em_title",length = 50)
    private String title;

    @Column(name = "em_content",length = 1000)
    private String content;

    @Column(name = "em_co",length = 1)
    private int co;

    @Column(name ="em_ot",length = 4)
    private String em_ot;

    @Column(name ="em_ep",length = 1)
    private String ep;

    @Column(name ="em_start_date")
    private LocalDate start_date;

    @Column(name ="em_end_date")
    private LocalDate end_date;

    @Column(name = "em_file",length = 1000)
    private String file;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "em_user_id" ,foreignKey = @ForeignKey(name="em_user_id_fk"))
    private Member user_id;*/

}
