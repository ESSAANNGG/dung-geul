package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
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
public class Member extends BaseEntity {

    @Id
    private String user_id; // Long -> String - 정혜리


    @Column(length = 18, nullable = false)
    private String user_name;

    @Column( nullable = false)
    private String user_pw;

    @Column(length = 11, nullable = false)
    private int user_ph;

    @Column(length = 120, nullable = false)
    private String user_addr;

    @Column(length = 50, nullable = false, unique = true)
    private String user_email;

    @Column(length = 50)
    private String user_dept;  //교직원 부서, 교수 소속계열, 학생소속계열

    @Column(length = 50)
    private String user_class; // 교수,학생 담당반

    @Column(length = 50)
    private String user_job; //직장


    // 회원 권한

    @ElementCollection(fetch = FetchType.LAZY)
    @Builder.Default
    private Set<MemberRole> roleSet = new HashSet<>();

    public void addMemberRole(MemberRole memberRole){
        roleSet.add(memberRole);
    }


    // 회원에 따라 있을수도 있고 없을 수도 있어서 setter 만듬

    public void setUser_dept(String user_dept) {
        this.user_dept = user_dept;
    }

    public void setUser_class(String user_class) {
        this.user_class = user_class;
    }

    public void setUser_job(String user_job) {
        this.user_job = user_job;
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
