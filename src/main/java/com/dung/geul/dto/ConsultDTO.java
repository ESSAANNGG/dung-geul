package com.dung.geul.dto;

import com.dung.geul.entity.BaseEntity;
import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "consult_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "consult_modDate"))
})
public class ConsultDTO{
    private Long cno;
    private LocalDateTime consult_regdate;
    private LocalDateTime consult_moddate;

    private String type;
    private String name;
}
