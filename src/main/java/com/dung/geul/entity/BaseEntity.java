package com.dung.geul.entity;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import java.time.LocalDateTime;

// entity 객체의 등록 시간과 최종 수정 시간을 담당하는 추상 클래스

@MappedSuperclass   // 해당 어노테이션이 적용된 클래스는 테이블로 생성되지 않는다.
@EntityListeners(value={AuditingEntityListener.class})
@Getter
public class BaseEntity {

    @CreatedDate
    @Column(name="regdate", updatable = false)
    private LocalDateTime regDate;

    @LastModifiedDate
    @Column(name="moddate")
    private LocalDateTime modDate;
}
