$(document).ready(function (e) {
    $('.item a').on('click', function (e) {
        e.preventDefault();
        var _this = $(this),
            item = _this.closest('.item'),
            dir = _this.attr('href').replace('#', ""),
            selectSection = $('.wrap-section').filter("[data-target="+dir+"]");
        ;
        item.add(selectSection).addClass('active').siblings().removeClass("active");
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
            content = $('.wrap-section-textarea').text();
        if (name) {
            if (content){
                sendPost(name, content);
            } else {
                $('.wrap-section-textarea').text("Vvedite text");
            }
        } else {
            $('input[name=name]').val('Zapolni')
        }
    });
    function sendPost(name, content){
        $.ajax({
            url:"../components/add.php",

        })
    }
});