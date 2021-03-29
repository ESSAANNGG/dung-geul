package com.dung.geul.entity;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name="mentoring")
public class Mentoring implements Serializable {

    @Id
    @Column(name = "mentor_num")
    private Long mentoring_id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mentor_user_id" ,foreignKey = @ForeignKey(name="metor_user_id_pfk"))
    private Member user_id;


    private LocalDate mentor_start_date;

    private LocalDate mentor_end_date;
}
