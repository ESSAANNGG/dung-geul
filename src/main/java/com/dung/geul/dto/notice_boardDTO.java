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
public class notice_boardDTO {

    private Long num;   // 게시글 번호

    private String title;   // 게시글 제목

    private String content; // 게시글 내용

    private Member b;   // 게시글 작성자

    // 게시글 파일

    //private LocalDateTime regDate, modDate;

}
