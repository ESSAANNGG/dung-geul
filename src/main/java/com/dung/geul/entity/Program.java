package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "pr_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "pr_modDate"))
})
public class Program extends BaseEntity {       // 지원프로그램 테이블

    @Id
    private Long pr_num;                        // 지원프로그램 번호

    @Column(length = 20, nullable = false)
    private String pr_title;                    // 지원프로그램 이름

    @Column(length = 255, nullable = false)
    private String prog_content;                // 내용

    @Temporal(TemporalType.DATE)
    private LocalDate pr_start;                      // 시작일

    @Temporal(TemporalType.DATE)
    private LocalDate pr_finish;                     // 마감일

    @Column(length = 10, nullable = false)
    private String prog_manager;            // 담당자

    @Column(length = 20, nullable = false)
    private String prog_semester;               // 해당학기

}
