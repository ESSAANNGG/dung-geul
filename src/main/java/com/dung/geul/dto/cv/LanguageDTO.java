package com.dung.geul.dto.cv;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LanguageDTO {

    private Long fl_id;
    private String fl_language;         //언어
    private String fl_conversation;     // 회화
    private String fl_reading;          // 읽기
    private String fl_writing;          // 쓰기
    private String fl_name;             // 시험이름
    private int fl_score;            // 점수
    private String fl_rank;             // 급수
    private LocalDate fl_date;             // 취득일
}
