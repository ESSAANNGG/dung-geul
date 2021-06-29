package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
@Builder
@Entity
public class License extends BaseEntity implements Serializable{

    @Id
    private String licNum; //자격증 등록번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name="lic_user_id_fk"))
    private Member member;

    @Column(length = 50, nullable = true)
    private String licName; // 자격증 이름

    private String licAgency;   // 발급기관

    private String licType; // 자격종류

    // 유효기간
    private LocalDate licDate;   // 유효일
    private LocalDate licDueDate; // 마감일

    private String licFile; // 첨부파일

    private int inCv;           // 1: 이력서에 추가되어 있음 , 0 : 없음

    public void modLicNum(String licNum){
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

    public void modInCv(int inCv){ this.inCv = inCv; }

    public void modLicAgency(String licAgency){
        this.licAgency = licAgency;
    }

    public void modLicType(String licType){
        this.licType = licType;
    }
}
