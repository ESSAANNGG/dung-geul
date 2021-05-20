package com.dung.geul.repository.search;

import com.dung.geul.entity.Employ;
import com.dung.geul.entity.QEmploy;
import com.dung.geul.entity.QEnterprise;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.PathBuilder;
import com.querydsl.jpa.JPQLQuery;
import lombok.extern.log4j.Log4j2;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;


import java.util.List;
import java.util.stream.Collectors;

import static com.dung.geul.entity.QIntroduce.introduce;

@Log4j2
public class SearchEmployRepositoryImpl extends QuerydslRepositorySupport implements SearchEmployRepository {

    public SearchEmployRepositoryImpl() {
        super(Employ.class);
    }

    @Override
    public Employ search1() {

        log.info("-------------------search1................----------------");

        QEmploy employ = QEmploy.employ;
        QEnterprise enterprise = QEnterprise.enterprise;

        JPQLQuery<Employ> jpqlQuery = from(employ);
        jpqlQuery.leftJoin(enterprise).on(employ.eq(employ));

//        jpqlQuery.select(employ).where(employ.num.eq(7L));
       JPQLQuery<Tuple> tuple = jpqlQuery.select(employ, enterprise.etp_id);

        log.info("------------------------------");
        log.info(tuple);
        log.info("------------------------------");

        List<Employ> result = jpqlQuery.fetch();

        log.info(result);

        return null;
    }

    @Override
    public Page<Object[]> searchpage(String type, String[] keywords, Pageable pageable) {


        log.info("searchPage................");

        QEmploy employ = QEmploy.employ;
        QEnterprise enterprise = QEnterprise.enterprise;

        JPQLQuery<Employ> jpqlQuery = from(employ);
        jpqlQuery.leftJoin(enterprise).on(employ.etp_id.eq(enterprise));

        JPQLQuery<Tuple> tuple = jpqlQuery.select(employ,enterprise);

        BooleanBuilder booleanBuilder = new BooleanBuilder();
        BooleanExpression expression = employ.num.gt(0L);

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
                        conditionBuilder.and(employ.title.contains(keywords[0])  );
                        break;
                    case "w" :
                        conditionBuilder.and(enterprise.etp_name.contains(keywords[1]));
                        break;
                    case "ot" :
                        conditionBuilder.and(employ.ot.contains(keywords[2]));
                        break;
                    case "ep" :
                        conditionBuilder.and(employ.ep.contains(keywords[3]));
                        break;
                    case "shape" :
                        conditionBuilder.and(enterprise.etp_shape.contains(keywords[4]));
                        break;
                    case "sido" :
                        conditionBuilder.and(employ.area.contains(keywords[5]));
                        break;
                    case "gugun" :
                        conditionBuilder.and(employ.area.contains(keywords[6]));
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

            PathBuilder orderByExpression = new PathBuilder(Employ.class, "employ");

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
