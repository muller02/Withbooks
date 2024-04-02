package kr.withbooks.web.controller;

import kr.withbooks.web.entity.Shorts;
import kr.withbooks.web.entity.ShortsAttachment;
import kr.withbooks.web.entity.ShortsView;
import kr.withbooks.web.service.BookService;
import kr.withbooks.web.service.ShortsAttachmentService;
import kr.withbooks.web.service.ShrotsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Controller
@RequestMapping("shorts")
public class ShortsController {

    @Autowired
    private ShrotsService service;

    @Autowired
    private BookService bookService;


    @Autowired
    private ShortsAttachmentService shortsAttachmentService;


    @GetMapping("list")
    public String list(Model model, @RequestParam(name = "id", required = false) Long bookId) {



        List<ShortsView> list = service.getView(bookId);
        // System.out.println(list);


        for (ShortsView view : list) {
            Long id = view.getId();
            List<ShortsAttachment> attachList = shortsAttachmentService.getListById(id);

            List<String> imgList = new ArrayList<>();
            // null이 아닐 떄는, attachlist만큼의 반복을 돌면서 , list.img에 attahlist의 img를 꺼내서  담아주기
            System.out.println(attachList);
            for (ShortsAttachment shortsAttachment : attachList) {

                imgList.add(shortsAttachment.getImg());
                view.setImg(imgList);
            }
        }
        model.addAttribute("list", list);




        return "shorts/list";
    }




    @GetMapping("bookreg")
    public String bookregForm(@RequestParam(name = "content", required = false) String content
    ) {

        return "shorts/bookreg";
    }

    @GetMapping("reg")
    public String regForm(@RequestParam(name = "content", required = false) String content
    ) {

        return "shorts/reg";
    }


    @PostMapping("reg")
    public String reg(@RequestParam(name = "text-area", required = false) String content
            , @RequestParam(name = "files") List<MultipartFile> files
            , @RequestParam(required = false) Long bookId
            , HttpServletRequest request   ) throws IOException {

        Shorts item = Shorts.builder()
                .bookId(bookId)
                .userId(1L)
                .content(content)
                .build();

          service.add(item);   // 북쇼츠 내용 저장

                System.out.println("사이즈 = "+files.size());
                for(MultipartFile f : files){
                    System.out.println("파일네임 = "+f.getOriginalFilename());

                }
     

          Shorts shorts = Shorts.builder().bookId(bookId).content(content).userId(1L).build();
              service.add(shorts); //파일 db 첨부
          Long shortsId = shorts.getId();


          String fileName = null;

     

          for(int i=0; i<files.size(); i++){

            if (!files.get(i).isEmpty()) {

                fileName = files.get(i).getOriginalFilename();

                String path = "/image/shorts";
                String realPath = request.getServletContext().getRealPath(path);
                File file = new File(realPath);
                if(!file.exists())
                    file.mkdirs();              

                File filePath = new File(realPath+File.separator+fileName);
             
                files.get(i).transferTo(filePath);
                
            
                ShortsAttachment shortsAttachment = ShortsAttachment.builder().ShortsId(shorts.getId()).img(fileName).build();
                //for문을 돌면서 다중 파일 이미지 이름을 db(shorts_attachment)에 저장
                shortsAttachmentService.add(shortsAttachment);
            }
          }








   
    
       

        // }


   
        return "redirect:/shorts/list";

    }


 

}