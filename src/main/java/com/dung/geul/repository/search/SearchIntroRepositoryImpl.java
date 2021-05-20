package com.dung.geul.repository.search;

import com.dung.geul.entity.*;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.stream.Collectors;

import static com.dung.geul.entity.QIntroduce.introduce;

@Log4j2
public class SearchIntroRepositoryImpl extends QuerydslRepositorySupport implements SearchIntroRepository {

    public SearchIntroRepositoryImpl() {
        super(Introduce.class);
    }

    @Override
    public Page<Object[]> Introsearchpage(String type, String[] keywords, Pageable pageable) {

        log.info("searchPage................");

        QIntroduce introduce = QIntroduce.introduce;
        QMember member = QMember.member;

        JPQLQuery<Introduce> jpqlQuery = from(introduce);
        jpqlQuery.leftJoin(member).on(introduce.writer.eq(member));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(introduce,member);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = introduce.num.gt(0L);

        booleanBuilder.and(expression);

        if(type != null) {

            String[] typeArr = type.split(",");
            //검색 조건을 작성하기
            BooleanBuilder conditionBuilder = new BooleanBuilder();

            for(String t:typeArr) {
                System.out.println("ABCD");
                System.out.println(t);
                switch (t) {
                    case "t" :
                        conditionBuilder.and(introduce.title.contains(keywords[0])  );
                        break;
                    case "c" :
                        conditionBuilder.and(introduce.content.contains(keywords[0])  );
                        break;
                }
            }
            booleanBuilder.and(conditionBuilder);
        }

        tuple.where(booleanBuilder);

        //order by
        Sort sort = pageable.getSort();

        //tuple.orderBy(employ.num.desc());

        sort.stream().forEach(order -> {
            Order direction = order.isAscending()? Order.ASC: Order.DESC;
            String prop = order.getProperty();

            PathBuilder orderByExpression = new PathBuilder(Introduce.class, "introduce");

            tuple.orderBy(new OrderSpecifier(direction, orderByExpression.get(prop)));
        });

        //page 처리
        tuple.offset(pageable.getOffset());
        tuple.limit(pageable.getPageSize());

        List<Tuple> result = tuple.fetch();

        log.info(result);

        long count = tuple.fetchCount();

        log.info("COUNT: " + count);

        return new PageImpl<Object[]>(
                result.stream().map(t -> t.toArray()).collect(Collectors.toList()),pageable,count);
    }
}
