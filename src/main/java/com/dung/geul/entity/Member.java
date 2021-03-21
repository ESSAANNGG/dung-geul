package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "user_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "user_modDate"))
})
public class Member extends BaseEntity {

    @Id
    private Long user_id;


    @Column(length = 18, nullable = false)
    private String user_name;

    @Column( nullable = false)
    private String user_pw;

    @Column(length = 11, nullable = false)
    private int user_ph;

    @Column(length = 120, nullable = false)
    private String user_addr;

    @Column(length = 50, nullable = false)
    private String user_email;

    @Column(length = 50)
    private String user_dept;  //교직원 부서, 교수 소속계열, 학생소속계열

    @Column(length = 50)
    private String user_class; // 교수,학생 담당반

    @Column(length = 50)
    private String user_job; //직장




}
