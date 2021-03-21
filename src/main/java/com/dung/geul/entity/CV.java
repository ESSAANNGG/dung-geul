package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "cv")
public class CV  implements Serializable{

    @Id
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cv_user_id" ,foreignKey = @ForeignKey(name="cv_user_id_fk"))
    private Member user_id;

    @Column(length = 3, nullable = false)
    private String cv_ad; // 계열학과

    @Column(length = 1, nullable = false)
    private String cv_military; // 병력사항

    @Column(length = 1, nullable = false)
    private String cv_employment; //취업여부

    @Column(length = 1, nullable = false)
    private String cv_verteran; //보훈대상여부

    @Column(length = 3, nullable = false)
    private Long cv_grade; //대학 성적

    @Column(length = 1, nullable = false)
    private String cv_disability; //장애여부

    @Column(length = 1, nullable = false)
    private String cv_carrer; //경력 여부 //경력사항 테이블이 있는데 경력여부 열이 필요한가?


    //대학 성적 float ?? int??
    // 이력서에 등록일 수정일이 필요하려나 //

}
