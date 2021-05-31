package com.dung.geul.dto;

import com.dung.geul.entity.BaseEntity;
import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Builder
@AllArgsConstructor
@Data
@ToString
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "consult_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "consult_modDate"))
})
public class ConsultDTO extends BaseEntity {
    private Long cno;
    private String Consult_field;
    private String Consult_detail_field;
    private LocalDateTime consult_regdate;
    private LocalDateTime consult_moddate;
}
