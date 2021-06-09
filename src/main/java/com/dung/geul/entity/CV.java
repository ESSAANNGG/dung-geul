package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

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

    private String name_china;

    private LocalDate birth;

    private int user_age;

    private String user_hp;

    private String user_email;

    private String addr;

    // 우대사항 / 병력
    private int cv_verteran;

    private int cv_disability;

    private int cv_military;

    private String cv_disability_degree;

    private String cv_military_now;

    // 희망 조건
    private String sec_of_exam;             // 응시부문

    private String Desired_salary;          // 희망 연봉

    // 취미 특기
    private String cv_hobby;                 // 취미

    private String cv_specialty;             // 특기


    //setter

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public void setName_china(String name_china) {
        this.name_china = name_china;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public void setUser_hp(String user_hp) {
        this.user_hp = user_hp;
    }

    public void setUser_email(String user_email) {
        this.user_email = user_email;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public void setCv_verteran(int cv_verteran) {
        this.cv_verteran = cv_verteran;
    }

    public void setCv_disability(int cv_disability) {
        this.cv_disability = cv_disability;
    }

    public void setCv_military(int cv_military) {
        this.cv_military = cv_military;
    }

    public void setCv_disability_degree(String cv_disability_degree) {
        this.cv_disability_degree = cv_disability_degree;
    }

    public void setCv_military_now(String cv_military_now) {
        this.cv_military_now = cv_military_now;
    }

    public void setSec_of_exam(String sec_of_exam) {
        this.sec_of_exam = sec_of_exam;
    }

    public void setDesired_salary(String desired_salary) {
        Desired_salary = desired_salary;
    }

    public void setCv_hobby(String cv_hobby) {
        this.cv_hobby = cv_hobby;
    }

    public void setCv_specialty(String cv_specialty) {
        this.cv_specialty = cv_specialty;
    }
}