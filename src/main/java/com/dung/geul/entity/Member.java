package com.dung.geul.entity;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "user_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "user_modDate"))
})
@ToString
@Table(name ="member")
public class Member extends BaseEntity {

    @Id
    private String user_id; // Long -> String - 정혜리 TEMP_ID

    @Column(length = 18, nullable = false)
    private String user_name;

    @Column( nullable = false)
    private String user_pw;

    @Column(length = 11, nullable = false)
    private String user_ph;

    @Column(length = 120)
    private String user_postcode;

    @Column(length = 120)
    private String user_addr;

    @Column(length = 120)
    private String user_addr_details;

    @Column(length = 50, nullable = false)
    private String user_email;

    @Column(length = 50)
    private String user_dept;  //교직원 부서, 교수 소속계열, 학생소속계열

    @Column(length = 50)
    private String user_grade;

    @Column(length = 50)
    private String user_class; // 교수,학생 담당반

    @Column(length = 1)
    private int user_allow; // 인증여부 ( 1: 인증 됨, Null : 인증 전)

    private String user_type;   // 회원구분 (기업인증 코드 짜다가 필요해서 넣음)


    // 회원 권한
    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    public void addMemberRole(MemberRole memberRole){
        roleSet.add(memberRole);
    }


    // 수정 가능한 항목
    public void memberModify(String user_name,
                             String user_ph,
                             String user_email,
                             String user_postcode,
                             String user_addr,
                             String user_addr_details) {
        this.user_postcode = user_postcode;
        this.user_addr = user_addr;
        this.user_addr_details = user_addr_details;
        this.user_name = user_name;
        this.user_ph = user_ph;
        this.user_email = user_email;
    }

    public void modUser_pw(String user_pw){
        this.user_pw = user_pw;
    }


    public void modUser_dept(String user_dept) {
        this.user_dept = user_dept;
    }

    public void modUser_grade(String user_grade) {
        this.user_grade = user_grade;
    }

    public void modUser_class(String user_class) {
        this.user_class = user_class;
    }

    // 인증해줄 때 기업 인증 여부 변경
    public void modUser_allow(int user_allow){
        this.user_allow = user_allow;
    }

    public void modUser_type(String user_Type){
        this.user_type = user_Type;
    }



    /*
    Set : 순서가 없고 중복을 허용하지 않는 데이터의 집합

    @ElementCollection
        Entity 클래스가 아닌 단순한 형태의 객체 집합을 정의하고 관리하는 방법이다.
        @Entity를 받는 속성을 정의할 수 없다.(id, column 처리하는 다른 변수를 못만든다는 뜻) 그렇게 하려면 @OneToMany를 사용해야 한다.
        이 어노테이션이 설정된 속성은 부모 클래스와 별도로 저장하거나 테이블에서 가져올 수 없다.
        무조건 항상 부모와 함께 저장되고 삭제되고 관리된다. MemberRole은 Member테이블과 항상 같이 관리되어야한다는 말이다

       *) https://kogle.tistory.com/137 (List Map 설명도 있음)

     */

}
