package com.dung.geul.dto.cv;

import com.dung.geul.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FamilyDTO {

    private Long id;
    private Long fam_num;
    private String fam_relation;
    private String fam_name;
    private int fam_age;
    private LocalDate fam_birth;
    private String fam_living;

}
