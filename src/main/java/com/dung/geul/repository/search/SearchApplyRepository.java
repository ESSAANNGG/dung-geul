package com.dung.geul.repository.search;

import com.dung.geul.dto.apply.ApplyStudentDTO;
import com.dung.geul.dto.apply.QApplyStudentDTO;
import com.dung.geul.entity.Apply;
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

import static com.dung.geul.entity.QApply.apply;
import static com.dung.geul.entity.QCV.cV;
import static com.dung.geul.entity.QEmploy.employ;
import static com.dung.geul.entity.QEnterprise.enterprise;

@Log4j2
@Repository
public class SearchApplyRepository extends QuerydslRepositorySupport {

    private  final JPAQueryFactory queryFactory;

    public SearchApplyRepository(JPAQueryFactory queryFactory) {
        super(Apply.class);
        this.queryFactory = queryFactory;
    }

    public Page<ApplyStudentDTO> getApplyListPage(BooleanBuilder builder, Pageable pageable) {
        QueryResults<ApplyStudentDTO> page = queryFactory
                .select(
                        new QApplyStudentDTO(
                            cV.user_name,
                            cV.user_id.user_id,
                                employ.num,
                                employ.title,
                                enterprise.etp_id,
                                enterprise.etp_num,
                                enterprise.etp_name,
                                enterprise.etp_shape,
                                apply.ap_pass,
                                apply.ap_date.stringValue(),
                                cV.cv_id,
                                apply.introduce.num

                        )
                )
                .from(apply)
                .leftJoin(cV).on(apply.cv.eq(cV))
                .leftJoin(employ).on(apply.employ.eq(employ))
                .leftJoin(enterprise).on(employ.etpId.eq(enterprise))

                .where(builder)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<ApplyStudentDTO> list = page.getResults();

        log.info("list :" + list.toString());

        long total = page.getTotal();

        log.info("total : " + total);

        PageImpl<ApplyStudentDTO> pageImpl =  new PageImpl<>(list, pageable, total);

        log.info(pageImpl.getContent().toString());

        return pageImpl;
    }
}
