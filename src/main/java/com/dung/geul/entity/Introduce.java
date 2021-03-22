package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Clob;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
// @Table(name = "introduce") 필요없어 보여서 주석처리했음 -정혜리
public class Introduce extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long intro_num;

    @Lob
    @Column(name = "intro_content", nullable = false)
    private Clob content;

    @ManyToOne(fetch = FetchType.LAZY)
    private CV cv_user_id; //FK  패키지명 지움 - 정혜리

}