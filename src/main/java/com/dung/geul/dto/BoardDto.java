package com.dung.geul.dto;

import com.dung.geul.entity.Board;
import com.dung.geul.entity.Member;
import lombok.*;

import java.time.LocalDateTime;

// dto를 통하여 controller와 service사이의 데이터를 주고받는다.

@Getter
@Setter
@ToString
@NoArgsConstructor
public class BoardDto {
    private Long num;
    private Member b;
    private String board_title;
    private String content;
    private Long fileId;
//    private LocalDateTime createdDate;
//    private LocalDateTime modifiedDate;

    public Board toEntity() {   // dto에서 필요한 부분을 빌더 패턴을 통해 entity로 만든다.
        Board build = Board.builder()
                .num(num)
                .b(b)
                .board_title(board_title)
                .content(content)
                .fileId(fileId)
                .build();
        return build;
    }

    @Builder
    public BoardDto(Long num, Member b, String board_title, String content, Long fileId) {
        this.num = num;
        this.b = b;
        this.board_title = board_title;
        this.content = content;
        this.fileId = fileId;
//      this.createdDate = createdDate;
//      this.modifiedDate = modifiedDate;
    }
}
