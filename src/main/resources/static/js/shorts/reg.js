window.onload = function () {

    var textArea = document.querySelector(".text-area");
    var regBtn = document.querySelector(".reg-btn");
    // <!-- Initialize Quill editor -->
    const quill = new Quill('#editor', {
        modules: {
            syntax: true,
            toolbar: '#toolbar-container',
        },
        placeholder: '여기에 입력해 주세요',
        theme: 'snow',
    });

    
    regBtn.onclick = function (e) {
        // e.preventDefault();
        // e.preventDefault();
        // console.log("text = ",quill.getText());
        // console.log("HTML = ", quill.getSemanticHTML());
        // var p = document.getElementById("p");
        // p.innerHTML= quill.getSemanticHTML();
        // console.log(p.value);

        textArea.innerHTML = quill.getSemanticHTML();
        console.log(textArea.innerText);


    }

}






window.addEventListener("load", function () {

    // var form = this.document.querySelector(".book-search-textbox");
    // var btn = form.querySelector("button");
    // var input = form.querySelector("input");
    // var bookContent = this.document.querySelector(".book-content");
    // var item = bookContent.querySelector(".item");
    // var searchCount = bookContent.querySelector(".search-count");

    let searchBook = this.document.querySelector("#search-book");
    let btn = searchBook.querySelector(".btn");
    let resultList = searchBook.querySelector(".result-list");
    let queryInput = searchBook.querySelector(".query-input");
    let inputReset = searchBook.querySelector(".input-reset");
    let formGroup = this.document.querySelector(".form-group");


    let previewPanel = formGroup.querySelector(".preview-panel");


    inputReset.onclick = function(e){

        queryInput.value = "";
        
    }


    resultList.onclick = function(e){
        // 사용자가 클릭한게 책이라면
        // .book 요소를 선택한다
        // 그 요소 안에서 h1을 찾는다
        // 찾은 h1 요소의 textContent 읽는다
        // textContent를 queryInput에 넣는다
        if(e.target.closest(".book")) {
            const book = e.target.closest(".book");
            const bookH1 = book.querySelector("h1");
            const bookTitle = bookH1.textContent;

            let bookId = book.getElementsByTagName("div")[0].textContent;
            queryInput.value = bookTitle;

            document.querySelector(".id-input").value = bookId;

        }

        resultList.innerHTML = "";
    };
    
    btn.onclick = function (e) {
        e.preventDefault();
        

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        //비동기 처리
        xhr.onload = function () { //콜백 함수
            resultList.innerHTML = "";

            var list = JSON.parse(this.responseText);

            var bookCount = list.length;
            searchResultHtml =  `<div class="book-count">검색결과 : ${bookCount}</div>`;
            resultList.insertAdjacentHTML("beforeend", searchResultHtml);

            for (book of list) {

                var sectionHTML = `<section class="book">
                                        <h1>${book.title}</h1>
                                        <div class="d:none">${book.id}</div>
                                        <div><img src="${book.cover}" alt="책이미지"></div>
                                        <div>${book.author}</div>
                                        <div>${book.publisher}</div>
                                        <div>${book.pubDate}</div>
                                    </section>`;

                //var book = list[0];

                //     var sectionHTML = `    <a href="reg?b=${book.id}&n=${book.title}"><section class="d:flex h:2 ai:center item  ml:3 pl:3 ho">
                //     <h1 class="d:none">책 정보</h1>
                //     <div class=" w:74  mr:5 ">
                //         <img src="${book.cover}" alt="도둑맞은 집중력" class="w:100p h:100p  border-radius:2">
                //     </div>
                //     <div class="d:flex jc:center flex-direction:column "> 
                
                //         <div class="fs:4 fw:3">${book.title}</div>
                //         <div class="fs:2 fw:2 mb:1">${book.author} 저</div>
                //         <div class="fs:2 color:base-7">${book.publisher}</div>
                //         <div class="fs:2 color:base-7">${book.pubDate}</div>
                //     </div>
            
                // </section></a>
                //    `;

                resultList.insertAdjacentHTML("beforeend", sectionHTML);

                book = resultList.querySelector(".book");
                console.log(book);
            }


        };

        // false 를 붙이면 동기
        var q = queryInput.value;

        xhr.open("GET", `http://localhost:8080/api/book/list?q=${q}`);
        xhr.send();
    }


})



//////////////////////////////////////////////////////////




window.addEventListener("load", function(){
    
    var formGroup = this.document.querySelector(".form-group");
    var imgInput = formGroup.querySelector(".img-input");

    var previewPanel = formGroup.querySelector(".preview-panel");
    var imgLabel = formGroup.querySelector(".img-label");
    
    var  previewPanel = formGroup.querySelector(".preview-panel");

    var datatransfer = new DataTransfer();

 
    // 입력받은 이미지들을 처리(저장 및 img-panel에 이미지 추가)해주는 함수
    function inputImgHandler(files){
        for(var file of files){
            if(file.type.indexOf("image/")!=0){     
                alert("이미지만 업로드 할 수 있습니다.");
                return;
            }
    
            if(file.size > 100*1024*1024){
                alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
                return;
            };
        }
    
        
        for(var file of files){
            datatransfer.items.add(file);
            imgInput.files = datatransfer.files;
    
            console.log(imgInput.files);
    
            var reader = new FileReader();
    
            reader.onload = function(e){
                var img = document.createElement("img");
                img.src=e.target.result; 
                img.classList.add("h:3");           
                previewPanel.append(img);
    
                //렌더리이이이잉~~~~
                setTimeout( ()=> {
                    img.classList.add("slide-in");
                }, 10);
            };
    
            reader.readAsDataURL(file);
        }
    }


    
    imgLabel.ondragleave = function(e){
        console.log("드래그 리브");
        imgLabel.classList.remove("valid");
        imgLabel.classList.remove("invalid");
    }

    // 드래그 오버
    imgLabel.ondragover = function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("드래그 오버");

        var valid = e.dataTransfer &&
                    e.dataTransfer.types &&
                    e.dataTransfer.types.indexOf("Files") >= 0;     //배열의 indexOf메소드다. 문자열의 메소드와 이름이 같아서 착각할 수 있으니 주의

        if(valid)
            imgLabel.classList.add("valid");
        else
            imgLabel.classList.add("invalid");
        
    }

    // 드래그 앤 드랍 시 처리
    imgLabel.ondrop = function(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("드래그 드랍");
        
        inputImgHandler(e.dataTransfer.files);


    }
    
    // 이미지 직접 input 시 처리
    imgInput.oninput = function(e){
        inputImgHandler(e.target.files);
        
    };
});


