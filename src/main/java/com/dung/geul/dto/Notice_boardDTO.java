package com.dung.geul.dto;

import com.dung.geul.entity.Board;
import com.dung.geul.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Notice_boardDTO {  // 공지사항 DTO

    private Long   num;           // 게시글 번호
    private String title;         // 게시글 제목
    private String content;       // 게시글 내용
    private Member b;             // 게시글 작성자
    private Long   fileId;    // 게시글 첨부파일

//    시간
//    private LocalDateTime createdDate;
//    private LocalDateTime modifiedDate;

//    public Board toEntity() {
//        Board build = Board.builder()
//                .num(num)
//                .b(b)
//                .board_title(title)
//                .content(content)
//                .fileId(fileId)
//                .build();
//        return build;
//    }
//
//    @Builder
//    public notice_boardDTO(Long num, Member b, String title, String content, Long fileId) {
//        this.num = num;
//        this.b = b;
//        this.title = title;
//        this.content = content;
//        this.fileId = fileId;
////      this.createdDate fileId= createdDate;
////      this.modifiedDate = modifiedDate;
//    }

}
