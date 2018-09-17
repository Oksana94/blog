$(document).ready(function (e) {
    $('.item a').on('click', function (e) {
        e.preventDefault();
        navTabs($(this), item, $(".wrap-section"));
    });
    $('.media-item a').on('click', function (e) {
        e.preventDefault();
        navTabs($(this), item, $(".media-wrap"));
    });
    function navTabs(_this, item, container){
        var dir = _this.attr('href').replace('#', ""),
            item = _this.parentNode,
            selectSection =container.filter("[data-target="+dir+"]");
        item.add(selectSection).addClass('active').siblings().removeClass("active");
        if (dir=="titleAll") listTitles();
    }
    $('.btnText-btn').on('click', function (e) {
        e.preventDefault();
        var action = $(this).data("action"),
            aValueArgument = $(this).val(),
            aShowDefaultUI = false;
        document.execCommand(action, aShowDefaultUI, aValueArgument)
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
    listTitles();
});