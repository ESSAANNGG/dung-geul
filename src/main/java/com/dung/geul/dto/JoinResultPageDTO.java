package com.dung.geul.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class JoinResultPageDTO<T>{

    private T result; //-1: 실패 , 1:성공

    private int status; // 페이지 상태 200 성공, else (ex.500) 오류

}
