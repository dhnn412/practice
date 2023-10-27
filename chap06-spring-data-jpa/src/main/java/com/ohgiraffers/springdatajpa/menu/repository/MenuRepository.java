package com.ohgiraffers.springdatajpa.menu.repository;

import com.ohgiraffers.springdatajpa.menu.entity.Category;
import com.ohgiraffers.springdatajpa.menu.entity.Menu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu, Integer> {

    //입력 받은 menuPrice보다 큰 menuPrice를 가진 메뉴 목록 조회
    List<Menu> findByMenuPriceGreaterThan(Integer menuPrice);
    //전달 받은 menuPrice보다 큰 menuPPrice를 가진 메뉴 목록을 메뉴 가격 오름차순으로 조회
    List<Menu> findByMenuPriceGreaterThanOrderByMenuPrice(Integer menuPrice);
    //전달 받은 menuPrice보다 큰 menuPPrice를 가진 메뉴 목록을 메뉴 가격 내림차순으로 조회
    List<Menu> findByMenuPriceGreaterThan(Integer menuPrice, Sort sort);


    List<Menu>findByMenuNameContaining(String menuName);
    List<Menu> findByMenuPriceBetween(Integer menuPrice1, Integer menuPrice2);
    @Query(value = "select MENU_CODE, MENU_NAME, MENU_PRICE, CATEGORY_CODE, ORDERABLE_STATUS from TBL_MENU where CATEGORY_CODE = 4 ",
            nativeQuery = true)
    List<Menu> findKoreanMenu();
}