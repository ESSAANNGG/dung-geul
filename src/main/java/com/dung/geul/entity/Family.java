package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Family {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long fam_num;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name="family_member_fk"))
    private Member member;

    private String fam_relation;

    private String fam_name;

    private int fam_age;

    private LocalDate fam_birth;

    private String fam_living;
}
