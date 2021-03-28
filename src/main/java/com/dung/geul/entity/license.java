package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "lic_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "lic_modDate"))
})
public class license implements Serializable {

    @Id
    private Long lic_num; //자격증 등록번호

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lic_user_id" ,foreignKey = @ForeignKey(name="lic_user_id_fk"))
    private Member user_id;

    @Column(length = 50, nullable = false)
    private String lic_name; // 자격증 이름

    @Column(length = 4, nullable = false)
    private LocalDate lic_acquisition_date; // 취득일

    // 유효기간
    private LocalDate lic_effective_date;   // 유효일
    private LocalDate lic_due_date; // 마감일

    private String lic_file; // 첨부파일

}
