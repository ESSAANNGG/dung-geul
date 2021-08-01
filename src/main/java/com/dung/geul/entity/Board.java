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
public class Board extends BaseEntity{

    @Id
    @Column(name = "board_num")
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment
    private Long num; //글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="b_user_id",foreignKey = @ForeignKey(name="b_user_id_fk"))
    private Member b; // userid (FK) 작성자

    @Column(length = 50, nullable = false)
    private String board_title; //제목

    @Column(length = 2000, nullable = false)
    private String content; // 내용

    private String board_file; // 첨부파일

    private String file_name; // 원본 파일명

    private String type;        //공지사항/백호마일리지게시판 구분 ex) 공지사항,백호마일리지게시판

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="b_board_id" , foreignKey = @ForeignKey(name="b_board_id_fk"))
    private Board board; //글번호 본인 참조 FK

    //file 데이터타입 이랑 본인참조 어캐할지

// 글 수정(제목, 내용) -------------------------------------------------------------

    public void changeTitle(String title){
        this.board_title = title;
    }

    public void changeContent(String content){
        this.content = content;
    }

    public void changeType(String type){
        this.type=type;
    }

    public void changeBoard_file(String board_file){
        this.board_file=board_file;
    }

    public void changeFile_name(String file_name){
        this.file_name=file_name;
    }


}
