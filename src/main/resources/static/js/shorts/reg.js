

window.addEventListener("load", function(){

    
    var formGroup = this.document.querySelector(".form-group");
    var imgInput = formGroup.querySelector(".img-input");
    var  previewPanel = formGroup.querySelector(".preview-panel");

    var dataTransfer = new DataTransfer();
    
    
    imgInput.oninput = function(e){
        var files = imgInput.files;

        console.log("files = ",files);

        for(var file of files){

            if(file.type.indexOf("image/") != 0){
                alert("이미지만 첨부 가능합니다.");
                return;
            };
    
            if(file.size > 1000*1024){
                alert("크기는 100KB 이하만 업로드 할 수 있습니다.");
                return;
            };
        }

        for(var file of files){
            console.log("filename = ",file.name);
        }

        for(var file of files){
            var reader = new FileReader();


            reader.onload = function(e){
                // console.log(e.target.result);
                var img = document.createElement("img");
                img.src=e.target.result;
                
                previewPanel.append(img);
    
                //렌더리이이이잉~~~~
                setTimeout( ()=> {
                    img.classList.add("slide-in");
                    //10밀리세컨
                }, 10);

                // console.log("인풋에 들어있는 파일 = ", file);
                
            };
            dataTransfer.items.add(file);
            console.log("데이터트랜스퍼 파일 = ",dataTransfer.files);
        

            reader.readAsDataURL(file);
        }

        imgInput.files = dataTransfer.files;

        // for(var ff of files)
            // console.log("다 넣은 후에 files = ",files);

        
        // tempFiles = files;
        // for(var file of tempFiles)
        //     console.log("tempFiles  =",file.name);
        
            
    };



    

});