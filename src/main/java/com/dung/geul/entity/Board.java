package com.dung.geul.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;



@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="board")
@Entity
public class Board implements Serializable {

    @Id
    @Column(name = "board_num")
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment
    private Long num; //글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="b_user_id",foreignKey = @ForeignKey(name="b_user_id_fk"))
    private Member b; // userid (FK) 작성자

    @Column(length = 50, nullable = false)
    private String board_title; //제목

//    @Lob
//    private Clob board_content; //내용

// ------------------------------------------------------

//    @Column(length = 1500, nullable = false)
//    private String content;     // 내용

//    @Column(length = 50, nullable = false)
//    private Member b;      // 작성자

// ------------------------------------------------------

    private String board_file; //첨부파일


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="b_board_id" , foreignKey = @ForeignKey(name="b_board_id_fk"))
    private Board board; //글번호 본인 참조 FK

    //file 데이터타입 이랑 본인참조 어캐할지


}
