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
public class License extends BaseEntity implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long licNum; //자격증 등록번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name="lic_user_id_fk"))
    private Member member;

    @Column(length = 50, nullable = true)
    private String licName; // 자격증 이름

    // 유효기간
    private LocalDate licDate;   // 유효일
    private LocalDate licDueDate; // 마감일

    private String licFile; // 첨부파일

    private int inCv;   // 1: 이력서에 추가되어 있음 , 0 : 없음


    public void modLicNum(Long licNum){
        this.licNum = licNum;
    }

    public void modLicName(String licName) {
        this.licName = licName;
    }

    public void modLicDate(LocalDate licDate) {
        this.licDate = licDate;
    }

    public void modLicDueDate(LocalDate licDueDate) {
        this.licDueDate = licDueDate;
    }

    public void modLicFile(String licFile) {
        this.licFile = licFile;
    }

    public void modInCv(int inCv){ this.inCv = inCv; }
}
