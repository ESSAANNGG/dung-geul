package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
public class License implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long lic_num; //자격증 등록번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name="lic_user_id_fk"))
    private Member member;

    @Column(length = 50, nullable = false)
    private String lic_name; // 자격증 이름

    // 유효기간
    private LocalDate lic_date;   // 유효일
    private LocalDate lic_due_date; // 마감일

    private String lic_file; // 첨부파일

}
