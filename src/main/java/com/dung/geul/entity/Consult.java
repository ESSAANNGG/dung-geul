package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Consult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long cno_num;

    @Column(length = 50, nullable = false)
    private String Consult_field;

    @Column(length = 50, nullable = false)
    private String Consult_detail_field;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "applycant_user_id" ,foreignKey = @ForeignKey(name="applycant_user_id_fk"))
    private Member user_id;

}
