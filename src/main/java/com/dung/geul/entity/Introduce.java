package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Clob;
import java.time.LocalDateTime;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "writer")
public class Introduce extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "intro_num")
    private Long num;

    @Column(name = "intro_title")
    private String title;

    @Column(name = "intro_content1", length = 1600)
    private String content1;

    @Column(name = "intro_content2", length = 1600)
    private String content2;

    @Column(name = "intro_content3", length = 1600)
    private String content3;

    @Column(name = "intro_content4", length = 1600)
    private String content4;

    @Column(name ="intro_start_date")
    private LocalDateTime start_date;

    @Column(name ="intro_end_date")
    private LocalDateTime end_date;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;

}