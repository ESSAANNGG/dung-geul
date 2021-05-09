package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.sql.Clob;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString(exclude = "writer")
public class Introduce extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String intro_num;

    @Column(name = "intro_title")
    private String title;

    @Lob
    @Column(name = "intro_content")
    private Clob content;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member writer;

}