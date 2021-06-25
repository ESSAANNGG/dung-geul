package com.dung.geul.repository;

import com.dung.geul.dto.AllowEtpDTO;
import com.dung.geul.dto.QAllowEtpDTO;
import com.dung.geul.entity.Member;
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

import static com.dung.geul.entity.QEnterprise.enterprise;
import static com.dung.geul.entity.QMember.member;

@Repository
@Log4j2
public class MemberRepositorySupport extends QuerydslRepositorySupport {
    private final JPAQueryFactory queryFactory;

    public MemberRepositorySupport(JPAQueryFactory queryFactory) {
        super(Member.class);
        this.queryFactory = queryFactory;
    }

    public Page<AllowEtpDTO> getUser(BooleanBuilder builder, Pageable pageable){

        QueryResults<AllowEtpDTO> page = queryFactory
                .select(
                         new QAllowEtpDTO(
                                member.user_id,
                                member.user_name,
                                enterprise.etp_name,
                                enterprise.etp_num,
                                member.user_email,
                                member.user_emailDomain,
                                 member.regDate.stringValue(),
                                member.user_ph,
                                member.user_ph2,
                                member.user_ph3,
                                member.user_type,
                                 enterprise.etp_shape
                         )
                )
                .from(member)
                .leftJoin(enterprise).on(enterprise.member.eq(member))
                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<AllowEtpDTO> list = page.getResults();

        log.info("list :" + list.toString());

        long total = page.getTotal();

        log.info("total : " + total);

        PageImpl<AllowEtpDTO> pageImpl =  new PageImpl<>(list, pageable, total);

        log.info(pageImpl.getContent().toString());

        return pageImpl;

    }
}
