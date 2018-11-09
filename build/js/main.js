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
  if ($(".main-section--course")) {
    $('.main-section--course').css('margin-top', -a).css('padding-top', a);
  }

  if ($(".banner")) {
    var b = $(".banner").height();
    $(".page-course").css("min-height", b);
  }

    if (!document.fonts) {

        $("body").css("opacity", "1").addClass("body-ready");

    }
    $('a[href="#equipment3"]').on('shown.bs.tab', function (e) {
        $(window).trigger('resize');
        $('.course__teacher-list').slick({
            infiniti: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            arrows: true
        });
    })
    $('a[href="#equipment4"]').on('shown.bs.tab', function (e) {
        $(window).trigger('resize');
        $(function() {
            $('#equipment4 .scroll-pane').jScrollPane({showArrows: true});
        });
    })

    $('.books__list > .row').slick({
        infiniti: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true
    })
    $('.logo-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        arrows: true
    }); 
    $('.stanchion').slick({
        infiniti: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    })
    $(".lightgallery").lightGallery();
    $('.review-slider').slick({        
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true
    });
    $('.main-section__bottom-text').on('click', function(e) {
        //$("html:not(:animated),body:not(:animated)").animate({scrollTop: $('.courses-section').offset().top}, 600);
        $('.main-section__bottom').trigger('click');
        return false;
    })
    $('.main-section__bottom').on('click', function(e) {
        $('.courses-section').slideToggle();
    })
   
    $(function() {
	    $('.scroll-pane').jScrollPane({showArrows: true});
    });

    $('.js-select').selectric();
    $('.cart__like').on('click', function(e) {
    
        
        if( $(this).is('.cart__like_active')) {
            $(this).removeClass('cart__like_anim');
            $(this).removeClass('cart__like_active');
        } else {
            $(this).addClass('cart__like_active');
            $(this).addClass('cart__like_anim');
            setTimeout(function() {
                $('.cart__like').removeClass('cart__like_anim');
            }, 1000)
        }
        return false
    })
     $('.cart__count-input').on('input', function(e) {
         var val = parseFloat($(this).val());
         var rez = val > 0 ? val : 1;
         $(this).val(rez);
     })
     $('.cart__count-btn').on('click', function(e) {
        var a = 1;
        if( $(this).is('.cart__count-btn_minus')) {
            a = -1;
        }
        var val = parseFloat($(this).closest('.cart__count').find('.cart__count-input').val());
        var rez = val + a;
        rez = rez > 0 ? rez : 1;        
        $(this).closest('.cart__count').find('.cart__count-input').val(rez);
     })
     $('.main-section__left-item.calendar').on('click', function(e) {
        if( $(this).is('.open')) {
            $(this).removeClass('open');
            $('.main-section__left-hide').slideUp();
        } else {
            $(this).addClass('open');
            $('.main-section__left-hide').slideDown();
        }
     })
     $('.main-section__left-close').on('click', function(e) {
        $('.main-section__left-item.calendar').eq(0).trigger('click');
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

// галерея в rent
$(".rent-gallery__gallery-item").on("click", function() {
    var clicked = $(this);
    var perentCliked = clicked.closest(".tab-pane");
    // вставка картинки
    var fullSize = clicked.find("img").data("full");
    perentCliked.find(".rent-gallery__tab-view-item img").attr("src", fullSize);
    perentCliked.find(".rent-gallery__gallery-item").removeClass("rent-gallery__gallery-item_selected");
    clicked.addClass("rent-gallery__gallery-item_selected");
    // вставка title
    var tbig = clicked.find("img").data("tbig");
    var tsmall = clicked.find("img").data("tsmall");
    var titleView = perentCliked.find(".rent-gallery__title-view-item");
    titleView.html("<b>" + tbig + "</b> — " + tsmall);
});


if ($(".course__programms")) {
    $(".course__programms-title").on("click", function(e) {
        $(".course__programms-content").slideToggle();
        if ($(".course__title-arrow_expand").is(":visible")) {
            $(".course__title-arrow_expand").css("display", "none");
            $(".course__title-arrow_collapse").css("display", "block");
        } else {
            $(".course__title-arrow_expand").css("display", "block");
            $(".course__title-arrow_collapse").css("display", "none");
        }
    });

    var sublist = $(".course__programms-sublist");
    function checkSublist() {
        var k = false ;
        sublist.each(function(index, el) {
            if ($(this).css("display") === "block") {
                return k = true;
            } else {
                return k = false;
            }
        });
        if (k) {
            $(".course__button-expand_collapse").css("display", "block");
            $(".course__button-expand_expand").css("display", "none");
        } else {
            $(".course__button-expand_collapse").css("display", "none");
            $(".course__button-expand_expand").css("display", "block");
        }
    }
    $(".course__button-expand_expand").on("click", function(e) {
        sublist.slideDown();
        $(this).css("display", "none");
        $(".course__button-expand_collapse").css("display", "block");
        $(".course__programms-item").addClass("course__programms-item_open")
    });
    $(".course__button-expand_collapse").on("click", function(e) {
        sublist.slideUp();
        $(this).css("display", "none");
        $(".course__button-expand_expand").css("display", "block");
        $(".course__programms-item").removeClass("course__programms-item_open")
    });
    $(".course__programms-item").on("click", function(e) {
        $(this).children(".course__programms-sublist").slideToggle();
        $(this).toggleClass("course__programms-item_open");
        checkSublist();
    });
}

if ($(".course-registry")) {
    if ($(".course-registry__checkbox_sale-two input").is(":checked")) {
        $(".course-registry__wrapper-quantity").show();
    } else {
        $(".course-registry__wrapper-quantity").hide();
    }
    $(".course-registry__checkbox_sale-two").on("click", function(e) {
        if ($(".course-registry__checkbox_sale-two input").is(":checked")) {
            $(".course-registry__wrapper-quantity").show();
        } else {
            $(".course-registry__wrapper-quantity").hide();
        }
    });
}