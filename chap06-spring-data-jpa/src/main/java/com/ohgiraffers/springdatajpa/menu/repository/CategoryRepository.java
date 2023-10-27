package com.ohgiraffers.springdatajpa.menu.repository;

import com.ohgiraffers.springdatajpa.menu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category,Integer> {

    //Category테이블의 모든 entity를 조회하기 위해서 별도의 jpql 정의는 필요하지 않지만
    //예제를 만들기 위해서 작성해 본다(findAll 기능으로 조회 가능)

    //jpql
//    @Query(value = "select c from Category c order by c.categoryCode")
    //native
    @Query(value = "select CATEGORY_CODE, CATEGORY_NAME, REF_CATEGORY_CODE from TBL_CATEGORY order by CATEGORY_CODE",
        nativeQuery = true)
    public List<Category> findAllCategory();
}
