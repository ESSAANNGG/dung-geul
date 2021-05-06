package com.dung.geul.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

// 페이지 요청 DTO
@Builder
@AllArgsConstructor
@Data
public class PageRequestDTO {
    private int page;
    private int size;
    private String type;    // 검색 처리를 위한 조건
    private String keyword; // 검색 처리를 위한 키워드

    public PageRequestDTO(){
        this.size = 10;
        this.page = 1;
    }

    public PageRequestDTO(int page){
        this.page = page;
        this.size = 10;
    }

    public Pageable getPageable(Sort sort){
        return PageRequest.of(page -1,size,sort);
    }
}
