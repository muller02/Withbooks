package kr.withbooks.web.controller;

import kr.withbooks.web.entity.Book;
import kr.withbooks.web.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;


@Controller
@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService service;

    @GetMapping("/list")
    public String list(Model model) {
        List<Book> list = service.getList();

        model.addAttribute("list", list);
        System.out.println(list);
        return "/book/list";
    }

    @GetMapping("detail")
    public String detail(Model model, @RequestParam Long id) {
        Book book = service.get(id);
        model.addAttribute("book", book);

        return "book/detail";
    }

}
