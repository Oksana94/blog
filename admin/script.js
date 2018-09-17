$(document).ready(function (e) {
    $('.item a').on('click', function (e) {
        e.preventDefault();
        var _this = $(this),
            item = _this.closest('.item'),
            dir = _this.attr('href').replace('#', ""),
            selectSection = $('.wrap-section').filter("[data-target="+dir+"]");
        item.add(selectSection).addClass('active').siblings().removeClass("active");
        if (dir=="titleAll") listTitles();
    })
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
        deleteTitle($(this).closest("p").data('id'));
    })
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
                    $('.wrap-section-content').append("<p data-id='"+data[i].id+"' class='wrap-section-content-name'>"+data[i].name+"<span class='delete'>X</span></p>")
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
    listTitles();
});