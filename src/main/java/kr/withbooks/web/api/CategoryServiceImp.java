package kr.withbooks.web.api;

import kr.withbooks.web.entity.Category;
import kr.withbooks.web.repository.CategoryRepository;
import kr.withbooks.web.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController("apiCategoryService")
@RequestMapping("api/category")
public class CategoryServiceImp implements CategoryService {


   @Autowired
    private CategoryRepository repository;





    @GetMapping("list") //위드  상세검색에서 , 카테고리 리스트들을 출력하기 위한 api
    public List<Category> getList() {

        return  repository.findAll();
    }

    @GetMapping("item")
    public List<Category> get(@RequestParam(name = "c", required = false) Long id) {


        return repository.findById(id);
    }
}
