package com.dung.geul.entity;

import lombok.*;

import javax.lang.model.type.ArrayType;
import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
@AttributeOverrides({
        @AttributeOverride(name = "regDate", column = @Column(name = "consult_regdate")),
        @AttributeOverride(name = "modDate", column = @Column(name = "consult_modDate"))
})
public class Consult extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    @Column(length = 50, nullable = false)
    private String Consult_field;

    @Column(length = 50, nullable = false)
    private String Consult_detail_field;

    public void updatefiled(String consult_field) {
        this.Consult_field = consult_field;
    }

    @OneToMany(mappedBy = "cno")
    private List<Consulting> consultings = new ArrayList<>();

    public void updatedetail(String consult_detail_field) {
        this.Consult_detail_field= consult_detail_field;
    }
}
