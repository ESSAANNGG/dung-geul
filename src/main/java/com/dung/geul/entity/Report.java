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
@Table(name = "report")
public class Report implements Serializable {

    @Id
    @Column(name = "re_num")
    private Long num;

    @Column(length = 255, nullable = false)
    private String re_file;

    /*@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_user_id" ,foreignKey = @ForeignKey(name="re_user_id_fk"))
    private Member user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_mentor_num" ,foreignKey = @ForeignKey(name="re_mentor_num_fk"))
    private Mentoring mentor_num;  // 패키지명 지움 -정혜리

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_consult_num" ,foreignKey = @ForeignKey(name="re_consult_num_fk"))
    private Consulting consult_num; // 패키지명 지움 -정혜리*/
}
