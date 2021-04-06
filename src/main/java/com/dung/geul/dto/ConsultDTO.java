package com.dung.geul.dto;

import lombok.*;

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "con_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "con_modDate"))
})
public class ConsultDTO {
    private Long cno;
    private String field;
    private String detail_field;
    private String user_id;
//    private LocalDateTime regDate;
//    private LocalDateTime modData;
}
