package com.dung.geul.repository.search;

import com.dung.geul.dto.ConsultingDTO;
import com.dung.geul.dto.QConsultingDTO;
import com.dung.geul.entity.Consult;
import com.dung.geul.entity.Consulting;
import com.dung.geul.entity.QConsulting;
import com.dung.geul.entity.QMember;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.dung.geul.entity.QConsult.consult;
import static com.dung.geul.entity.QConsulting.consulting;
import static com.dung.geul.entity.QMember.member;

@Repository
@Log4j2
public class SearchConsultingRepository extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public SearchConsultingRepository(JPAQueryFactory queryFactory) {
        super(Consulting.class);
        this.queryFactory = queryFactory;
    }

    public Page<ConsultingDTO> getConuser(BooleanBuilder builder, Pageable pageable){

        QueryResults<ConsultingDTO> page;
        page = queryFactory
                .select(
                        new QConsultingDTO(
                                consulting.consult_num,
                                consult.cno,
                                consulting.Consult_field,
                                consulting.Consult_detail_field,
                                consulting.con_user_name,
                                member.user_id,
                                consulting.consult_date,
                                consulting.consult_time,
                                consulting.consult_approve
                        )
                )
                .from(consulting)
                .leftJoin(consult).on(consulting.cno.eq(consult))
                .leftJoin(member).on(consulting.user_id.eq(member))
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();
        List<ConsultingDTO> list = page.getResults();

        log.info("list :" + list.toString());

        long total = page.getTotal();

        log.info("total : " + total);

        PageImpl<ConsultingDTO> pageImpl = new PageImpl<>(list, pageable, total);

        log.info(pageImpl.getContent().toString());

        return pageImpl;

    }
}