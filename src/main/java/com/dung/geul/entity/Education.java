package com.dung.geul.entity;

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

    private LocalDate edc_date; // 년도

    private String edc_school;  // 학교명

    private String edc_dept;    // 학과

    private String edc_graduated;   // 졸업구분

    private double edc_gpa; //평점

    private  double edc_ps; //만점
}
