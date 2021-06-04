package com.dung.geul.entity;


import com.dung.geul.dto.AwardsDTO;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Awards{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(foreignKey = @ForeignKey(name="awards_member_fk"))
    private Member member;

    private String awards_des;      // 수상명

    private String awards_agency;   // 수여기관

    private String awards_date;     // 수상년도

    private String award_contents;  // 수여내용



}
