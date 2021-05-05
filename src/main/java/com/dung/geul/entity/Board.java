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

    @Column(length = 1500, nullable = false)
    private String content; // 내용

    private Long board_file; //첨부파일

// 시간
//    @CreatedDate
//    @Column(updatable = false)
//    private LocalDateTime createdDate;
//
//    @LastModifiedDate
//    private LocalDateTime modifiedDate;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="b_board_id" , foreignKey = @ForeignKey(name="b_board_id_fk"))
    private Board board; //글번호 본인 참조 FK

// 글 수정(제목, 내용) -------------------------------------------------------------

    public void changeTitle(String title){
        this.board_title = title;
    }

    public void changeContent(String content){
        this.content = content;
    }

// -------------------------------------------------------------------------------


    @Builder    // 모델 객체 생성 시 자동으로 해당 클래스에 빌더를 추가해준다
    public Board(Long num, Member b, String board_title, String content, Long board_file) {
        this.num = num;
        this.b = b;
        this.board_title = board_title;
        this.content = content;
        this.board_file = board_file;
    }


}
