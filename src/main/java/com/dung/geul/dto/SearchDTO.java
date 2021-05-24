package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@ToString
public class SearchDTO {
    // 검색 처리를 위한 조건들
    private String type;
    private String name;
    private String id;
    private String startDate;
    private String endDate;
}
