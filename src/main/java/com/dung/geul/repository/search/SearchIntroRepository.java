package com.dung.geul.repository.search;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchIntroRepository {

    Page<Object[]> Introsearchpage(String type, String[] keyword, Pageable pageable); //자소서 검색처리
}
