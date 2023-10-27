package com.ohgiraffers.springdatajpa.menu.service;

import com.ohgiraffers.springdatajpa.menu.dto.CategoryDTO;
import com.ohgiraffers.springdatajpa.menu.dto.MenuDTO;
import com.ohgiraffers.springdatajpa.menu.entity.Category;
import com.ohgiraffers.springdatajpa.menu.entity.Menu;
import com.ohgiraffers.springdatajpa.menu.repository.CategoryRepository;
import com.ohgiraffers.springdatajpa.menu.repository.MenuRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class MenuService {

    private final MenuRepository menuRepository;
    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public MenuService(MenuRepository menuRepository, CategoryRepository categoryRepository, ModelMapper modelMapper) {
        this.menuRepository = menuRepository;
        this.categoryRepository = categoryRepository;
        this.modelMapper = modelMapper;
    }

    //1. id로 entity조회 : findbyid
    public MenuDTO findMenuByCode(int menuCode) {

        // Entity로 조회한 뒤 비영속 객체인 MenuDTO로 변환해서 반환한다.
        Menu menu = menuRepository.findById(menuCode).orElseThrow(IllegalArgumentException::new);

        return modelMapper.map(menu, MenuDTO.class);
    }

    //2-1. 모든 entiry 조회: findAll(sort)
    public List<MenuDTO> findMenuList(){

        List<Menu>menuList = menuRepository.findAll(Sort.by("menuCode").descending());
        return menuList.stream().map(menu->modelMapper.map(menu,MenuDTO.class)).collect(Collectors.toList());
    }

    //2-2. 페이징 된 entity조회 : findAll(pageable)
    public Page<MenuDTO> findMenuList(Pageable pageable) {

        pageable = PageRequest.of(pageable.getPageNumber()<=0?0:pageable.getPageNumber()-1,
                pageable.getPageSize(),
                Sort.by("menuCode").descending());

        Page<Menu> menuList = menuRepository.findAll(pageable);

        return menuList.map(menu->modelMapper.map(menu, MenuDTO.class));
    }

    //Query Method test
    public List<MenuDTO> findMenuPrice(Integer menuPrice) {

//        List<Menu> menuList = menuRepository.findByMenuPriceGreaterThan(menuPrice);
//        List<Menu> menuList = menuRepository.findByMenuPriceGreaterThanOrderByMenuPrice(menuPrice);
        List<Menu> menuList = menuRepository.findByMenuPriceGreaterThan(menuPrice,Sort.by("menuPrice").descending());

        return menuList.stream().map(menu->modelMapper.map(menu, MenuDTO.class)).collect(Collectors.toList());
    }

    //jpql or native query test
    public List<CategoryDTO>findAllCategory(){

        List<Category> categoryList = categoryRepository.findAllCategory();

        return categoryList.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());

    }

    //5. entity저장
    @Transactional
    public void registNewMenu(MenuDTO menu) {

        menuRepository.save(modelMapper.map(menu, Menu.class));

    }

    //6. Entity 수정
    @Transactional
    public void modifyMenu(MenuDTO menu) {
        Menu foundMenu = menuRepository.findById(menu.getMenuCode()).orElseThrow(IllegalArgumentException::new);
        foundMenu.setMenuName(menu.getMenuName());
    }

    //7.entity삭제
    @Transactional
    public void deleteMenu(Integer menuCode) {
        menuRepository.deleteById(menuCode);
    }

    public List<MenuDTO> findByLike(String menuName) {
        List<Menu> menuList = menuRepository.findByMenuNameContaining(menuName);

        return menuList.stream().map(menu->modelMapper.map(menu, MenuDTO.class)).collect(Collectors.toList());
    }

    public List<MenuDTO> findByBetween(Integer menuPrice1, Integer menuPrice2) {
        List<Menu> menuList = menuRepository.findByMenuPriceBetween(menuPrice1,menuPrice2);

        return menuList.stream().map(menu->modelMapper.map(menu, MenuDTO.class)).collect(Collectors.toList());

    }

    public List<MenuDTO> findKoreanMenu() {
        List<Menu> menuList = menuRepository.findKoreanMenu();

        return menuList.stream().map(menu->modelMapper.map(menu, MenuDTO.class)).collect(Collectors.toList());
    }
}
