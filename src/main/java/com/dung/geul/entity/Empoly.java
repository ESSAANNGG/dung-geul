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
@Table(name="empoly")
public class Empoly {

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

    @Column(length = 255, nullable = false)
    private String em_file;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "em_user_id" ,foreignKey = @ForeignKey(name="em_user_id_fk"))
    private Member user_id;
}
