package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


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

    @Column(name = "em_title")
    private String title;

    @Column(name = "em_content",length = 1000)
    private String content;

    @Column(name ="em_ot")
    private String ot;

    @Column(name ="em_ep")
    private String ep;

    @Column(name ="em_start_date")
    private LocalDateTime start_date;

    @Column(name ="em_end_date")
    private LocalDateTime end_date;

    @Column(name = "em_people")
    private String people;

    @Column(name = "em_career")
    private String career;

    @Column(name = "em_education")
    private String education;

    @Column(name = "em_salary")
    private String salary;

    @Column(name = "em_area")
    private String area;

    @Column(name = "em_apply")
    private String apply;

    @Column(name = "em_file",length = 1000)
    private String file;

    @ManyToOne
    @JoinColumn(name = "em_etp_id")
    private Enterprise enterprise;

}
