package com.dung.geul.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

    private String fam_relation;

    private String fam_name;

    private int fam_age;

    private LocalDate fam_birth;

    private String fam_living;
}
