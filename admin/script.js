$(document).ready(function (e) {
    //AjaxImg
    var files;
    $('.upload').on('change', function () {
        files = this.files;
    });
    $('.uploadSend').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var data = new FormData();
        $.each(files, function (key, value) {
            data.append(key, value);
        });
        $.ajax({
            url:"../components/uploadImg.php?uploadfiles",
            type:"POST",
            data:data,
            dataType:"json",
            processData: false,
            contentType: false,
            success:function (res) {
                console.log(res);
                if(typeof res.error==="undefined"){
                    var files_path = res.files;
                    $.each(files_path, function (key, value) {
                        $('.media-all').append("<div class='item-Img'><img src='"+value+"'><span class='delImg'>X</span></div>");
                    });
                } else {
                    console.log("Ошибка ответа сервера: "+res.error);
                }
            },
            error:function (jqXHR, textStatus, errorThrown) {
                console.log("Ошибка Ajax запроса: "+textStatus);
            }
        })
    })
    //------------
    $('.item a').on('click', function (e) {
        e.preventDefault();
        navTabs($(this), $(".wrap-section"));
    });
    $('.media-item a').on('click', function (e) {
        e.preventDefault();
        navTabs($(this), $(".media-wrap-section"));
    });
    $('.btnText-btn').on('click', function (e) {
        e.preventDefault();
        var action = $(this).data("action"),
            aValueArgument = $(this).val(),
            aShowDefaultUI = false;
        if(action=="insertImage"){
            //popap path
            aValueArgument = "../uploads/150314846514562633.jpg";
        }
        document.execCommand(action, aShowDefaultUI, aValueArgument);
    });
    $('.save').on('click', function (e) {
        e.preventDefault();
        var name = $('input[name=name]').val(),
            content = $('.wrap-section-textarea').text(),
            date = new Date().toLocaleDateString();
            date = date.split(".").reverse().join("-");
        if (name) {
            if (content){
                sendPost(name, content, date);
            } else {
                $('.wrap-section-textarea').text("Vvedite text");
            }
        } else {
            $('input[name=name]').val('Zapolni')
        }
    });
    $('.wrap-section-content').on('click', '.delete', function (e) {
        deleteTitle($(this).closest(".wrap-section-content-name").data('id'));
    });
    $('.wrap-section-content').on('click', '.rename', function (e) {
        var _this = $(this).closest(".wrap-section-content-name"),
            id = _this.data('id'),
            name = _this.find('p').text();
        if(_this.hasClass("renameSend")){
            renameTitle(name, id);
            _this.removeClass("renameSend");
            _this.find('p').attr("contenteditable", "false");
            $(this).text('rename');
        } else {
            _this.addClass("renameSend");
            _this.find('p').attr("contenteditable", "true");
            $(this).text('save');
        }
    });
    function sendPost(name, content, date){
        $.ajax({
            url:"../components/add.php",
            type:"POST",
            data:{name:name, content:content, date:date},
            dataType:'html',
            success:function (data) {
                alert("Save");
                $('input[name=name]').val("");
                $('.wrap-section-textarea').text("");
                listTitles();
            }
        })
    }
    function listTitles(){
        $.ajax({
            url:"../components/list.php",
            type:"POST",
            data:{},
            dataType:'html',
            success:function (data) {
                data = JSON.parse(data);
                $('.wrap-section-content').empty();
                for(var i = 0; i<data.length; i++){
                    $('.wrap-section-content').append("<div data-id='"+data[i].id+"' class='wrap-section-content-name'><p>"+data[i].name+"</p><div class='tools'><span class='rename'>rename</span><span class='delete'>X</span></div></div>")
                }
            }
        })
    };
    function listImg(){
        $.ajax({
            url:"../components/listImg.php",
            type:"POST",
            data:{},
            dataType:'html',
            success:function (data) {
                data = JSON.parse(data);
                $('.media-all').empty();
                for(var i = 0; i<data.length; i++){
                    $('.media-all').append("<div class='item-Img'><img src='"+data[i].path+"' data-id='"+data[i].id+"'><span class='delImg'>X</span></div>");
                }
            }
        })
    };
    function deleteTitle(id){
        $.ajax({
            url:"../components/delete.php",
            type:"POST",
            data:{id:id},
            dataType:'html',
            success:function () {
                alert('delete');
                listTitles();
            }
        })
    };
    function renameTitle(name, id){
        $.ajax({
            url:"../components/rename.php",
            type:"POST",
            data:{name:name, id:id},
            dataType:'html',
            success:function () {
                alert('Change');
                listTitles();
            }
        })
    };
    function navTabs(_this, container){
        var dir = _this.attr('href').replace('#', ""),
            item = _this.parent(),
            selectSection = container.filter("[data-target="+dir+"]");
        item.add(selectSection).addClass('active').siblings().removeClass("active");
        if (dir=="titleAll") listTitles();
    }
    listTitles();
    listImg();
});