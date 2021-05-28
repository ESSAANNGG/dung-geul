package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "fl_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "fl_modDate"))
})
@Entity
public class Language extends BaseEntity implements Serializable {

    @Id
    private Long fl_num;

    @ManyToOne
    @JoinColumn(foreignKey = @ForeignKey(name="fl_member_fk"))
    private Member member;

    private String fl_language; // 언어

    private String fl_name; // test명

    private String fl_conversation; // 회화 (상,중,하)

    private String fl_reading;  // 독해 (상,중,하)

    private String fl_writing;  // 작문 (상,중,하)

    private int fl_score; //점수

    private String fl_rank; //급수  // 이건 엑셀파일에 없긴한데

    private LocalDate fl_date; //취득일
}
