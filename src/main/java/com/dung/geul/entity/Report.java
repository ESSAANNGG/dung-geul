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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_user_id" ,foreignKey = @ForeignKey(name="re_user_id_fk"))
    private Member user_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_mentor_num" ,foreignKey = @ForeignKey(name="re_mentor_num_fk"))
    private com.capstone.five.entity.Mentoring mentor_num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "re_consult_num" ,foreignKey = @ForeignKey(name="re_consult_num_fk"))
    private com.capstone.five.entity.Consulting consult_num;
}
