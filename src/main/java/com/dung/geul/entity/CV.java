package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "cv")
public class CV  implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cv_id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_user_id" ,foreignKey = @ForeignKey(name="cv_user_id_fk"))
    private Member user_id;

    // 기본정보
    private String user_name;

    private LocalDate birth;

    private String user_hp;

    private String user_email;

    // 우대사항 / 병력
    private int cv_verteran;

    private int cv_disability;

    private int cv_military;

    private String cv_disability_degree;

    private String militaryServiceClassification;

    // 희망 조건
    private String sec_of_exam;             // 응시부문

    private String Desired_salary;          // 희망 연봉

    // 취미 특기
    private String cv_hobby;                 // 취미

    private String cv_specialty;             // 특기

    @OneToMany(mappedBy = "member")
    private List<Awards> awardsList = new ArrayList<>();

    public int getAge(){

        int currentYear = LocalDate.now().getYear();
        int currentDay = LocalDate.now().getDayOfYear();

        System.out.println("year : " + currentYear  + " day : " + currentDay);

        System.out.println("birth : " + birth);

        int age = currentYear - this.birth.getYear();

        // 생일이 지났는지 안지났는지
        if(currentDay < birth.getDayOfYear()) age--;

        return age;
    }

}