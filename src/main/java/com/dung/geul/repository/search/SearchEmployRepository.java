package com.dung.geul.repository.search;

import com.dung.geul.entity.Employ;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface SearchEmployRepository {

    Employ search1();

    Page<Object[]> searchpage(String type, String[] keyword, Pageable pageable); //채용공고 검색처리


}
