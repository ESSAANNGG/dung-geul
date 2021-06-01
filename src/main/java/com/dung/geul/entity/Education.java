package com.dung.geul.entity;

import com.dung.geul.dto.CvPageDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long edc_ID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ed_user_id" ,foreignKey = @ForeignKey(name="ed_user_id_fk"))
    private Member member;

    private String schoolType;              //  학교 구분

    private String edc_school;              // 학교명

    private String edc_date_start;       // 입학년도

    private String edc_date_end;         // 졸업 년도

    private String edc_graduated;           // 졸업구분

    private String edc_dept;        // 학과

    private double edc_gpa;         //평점

    private double edc_ps;         //만점

    public void modEdc_date_start(String edc_date_start){
        this.edc_date_start = edc_date_start;
    }
    public void modEdc_date_end(String edc_date_end){
        this.edc_date_end = edc_date_end;
    }
    public void modEdc_graduated(String edc_graduated){
        this.edc_graduated = edc_graduated;
    }
    public void modEdc_dept(String edc_dept){
        this.edc_dept = edc_dept;
    }
    public void modEdc_gpa(double edc_gpa){
        this.edc_gpa = edc_gpa;
    }
    public void modEdc_ps(double edc_ps){
        this.edc_ps = edc_ps;
    }

}

