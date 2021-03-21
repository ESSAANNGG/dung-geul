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
@Table(name = "introduce")
public class Introduce extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long intro_num;

    @Lob
    @Column(name = "intro_content", nullable = false)
    private Clob content;

    @ManyToOne(fetch = FetchType.LAZY)
    private com.capstone.five.entity.CV cv_user_id; //FK

}