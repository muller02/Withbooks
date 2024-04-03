

window.addEventListener("load", function(){

    
    var formGroup = this.document.querySelector(".form-group");
    var imgInput = formGroup.querySelector(".img-input");

    var previewPanel = formGroup.querySelector(".preview-panel");
    var imgLabel = formGroup.querySelector(".img-label");

    var datatransfer = new DataTransfer();

    var  previewPanel = formGroup.querySelector(".preview-panel");

    var dataTransfer = new DataTransfer();
    


    // 입력받은 이미지들을 처리(저장 및 img-panel에 이미지 추가)해주는 함수
    function inputImgHandler(files){
        for(file of files){
            if(file.type.indexOf("image/")!=0){     
                alert("이미지만 업로드 할 수 있습니다.");
                return;
            }
    
            if(file.size > 100*1024*1024){
                alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
                return;
            };
        }
    
        
        for(file of files){
            datatransfer.items.add(file);
            imgInput.files = datatransfer.files;
    
            console.log(imgInput.files);
    
            var reader = new FileReader();
    
            reader.onload = function(e){
                var img = document.createElement("img");
                img.src=e.target.result;            
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


