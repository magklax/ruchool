var kazanMap, myplacemark1, myplacemark2, myplacemark3;
$(document).ready(function() {
    if ($("body").width() > 991) {
        if ($('.fixed-header').length == 0) {
            $("body").prepend(
                $(".stycky-wrap")
                    .clone()
                    .addClass("fixed-header")
                //.css("padding-right", window.innerWidth - document.documentElement.clientWidth)
            );
        }

        $(window).scroll(function () {
            if ($(window).scrollTop() > 500) {
                $(".fixed-header").addClass("sticky");
                $(".blog-right, .--sticky-col, .product-right, .cart-col").addClass("header-fix");
                $(".scroll-top").fadeIn();

            } else {
                $(".fixed-header").removeClass("sticky");
                $(".blog-right, .--sticky-col, .product-right, .cart-col").removeClass("header-fix");
                $(".scroll-top").fadeOut();

            }
        });
        $(".scroll-top").on('click', function() {
            $("html:not(:animated),body:not(:animated)").animate({scrollTop: 0}, 600);
            return false;
        });

        
    }
    if ($("body").width() < 768) {
        $(".footer__right").append($(".footer__left"));
        /*$(".nav-tabs").slick({
            prevArrow: '<button type="button" class="slick-prev"><svg class="svg svg-arr-left"><use xlink:href="#svg-icon-arr-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg class="svg svg-arr-right"><use xlink:href="#svg-icon-arr-right"></use></svg></button>',
        });*/
        $(".process .row").slick({
            prevArrow: '<button type="button" class="slick-prev"><svg class="svg svg-arr-left"><use xlink:href="#svg-icon-arr-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg class="svg svg-arr-right"><use xlink:href="#svg-icon-arr-right"></use></svg></button>',
        });
        $(".subscription-preim .row").slick({
            prevArrow: '<button type="button" class="slick-prev"><svg class="svg svg-arr-left"><use xlink:href="#svg-icon-arr-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg class="svg svg-arr-right"><use xlink:href="#svg-icon-arr-right"></use></svg></button>',
        });
        $(".tutors .row").slick({
            prevArrow: '<button type="button" class="slick-prev"><svg class="svg svg-arr-left"><use xlink:href="#svg-icon-arr-left"></use></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg class="svg svg-arr-right"><use xlink:href="#svg-icon-arr-right"></use></svg></button>',
        });
        $('.nav-tabs').on('afterChange', function(event, slick, currentSlide, nextSlide){
            $(".nav-tabs .slick-current .nav-link").tab('show')
        });
    }

  var a = $('.header-wrap').height();
  $('.main-section').css('margin-top', -a).css('padding-top', a +70);

    if (!document.fonts) {

        $("body").css("opacity", "1").addClass("body-ready");

    }
    $('.logo-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true
    });
    $(".lightgallery").lightGallery();
    $('.review-slider').slick({        
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    });
    $('.main-section__bottom-text').on('click', function(e) {
        $("html:not(:animated),body:not(:animated)").animate({scrollTop: $('.courses-section').offset().top}, 600);
        return false;
    })
    

});
if (document.fonts) {
    document.fonts.load("bold 16px Lato", "b").then(function() {
        if ($(".nav-link").length) {
            tabBorder($(".nav-link.active"));
        }

        console.log("font load");
        $("body").css("opacity", "1").addClass("body-ready");
    });
}


$(window).load(function() {
    $("body").css("opacity", "1");

});





//добавляет подчеркивание в топменю
function tabBorder(e) {
    //e = e.parent();
    var b = e.outerWidth(true),
        c = (e.outerWidth(true) - b) / 2,
        d = e.position().left;
    $(".border").css("left", d + c).css("width", b)
}

//превращает кнопку в лоадер
function addLoaderInBtn(e) {
    $(e).css("color", "transparent").html($(e).html() + "<div class='loader'>" +
        "<span></span>" +
        "<span></span>" +
        "<span></span>" +
        "</div>");
}
function removeLoaderInBtn(e) {
    $(e).css("color", "").find(".loader").fadeOut(function() {
        $(e).find(".loader").remove();
    });
}
//делает высоту элементов одинаковой
function setHeight($e) {
    var h = 0;
    function a($e) {
        $($e).each(function(e) {
            if ($(this).outerHeight(true) > h) {
                h = $(this).outerHeight(true);
            }
        });
        $($e).outerHeight(h);
    }
    a($e);
    $(window).resize(function () {
        a($e);
    });
}
function setWorkListHeight() {
    if ($(".fixed-header.header-wrap .work-list.ps").length) {
        return
    }
    var elemHeight = $(".fixed-header.header-wrap .work-list").outerHeight();
    var elemOffset = $(".fixed-header.header-wrap .work-list").offset().top - $(window).scrollTop();
    var windowHeight = $(window).height();
    console.log(elemHeight + elemOffset)

    if(elemHeight + elemOffset > windowHeight) {
        var itogHeight = windowHeight - elemOffset - 30;
        $(".fixed-header.header-wrap .work-list").outerHeight(itogHeight);
        var ps = new PerfectScrollbar('.fixed-header.header-wrap .work-list', {
            suppressScrollX: true
        });
    }
}
