package com.dung.geul.dto;

import com.dung.geul.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class notice_boardDTO {      // 공지사항 DTO

    private Long num;               // 게시글 번호

    private String title;           // 게시글 제목

    private String content;         // 게시글 내용

    private Member b;               // 게시글 작성자

    private LocalDateTime regDate;  // 작성일

    private String board_file;      // 첨부파일

    private String file_name;       // 원본 파일명

    private String type;              // 공지사항/백호마일리지게시판 구분 ex) 공지사항,백호마일리지

}
