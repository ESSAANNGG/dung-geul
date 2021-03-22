package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;


@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "mentor_ap")
public class Mentor_ap implements Serializable {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_ap_mentor_num" ,foreignKey = @ForeignKey(name="mentor_ap_mentor_num"))
    private Mentoring mentor_num;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_ap_cv_user_id" ,foreignKey = @ForeignKey(name="mentor_ap_cv_user_id"))
    private CV cv_user_id;
}
