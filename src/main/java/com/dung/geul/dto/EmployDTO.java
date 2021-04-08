package com.dung.geul.dto;

import lombok.*;


import java.time.LocalDateTime;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmployDTO {

    private Long num;

    private String name;

    private String title;

    private String content;

    private LocalDateTime regDate, modDate;

}
