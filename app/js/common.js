$(document).ready(function(){

    // $(".toggle-mnu").click(function() {
    //     $(this).toggleClass("on");
    //     return false;
    // });


    /**
     * mobile-mnu customization
     */
    var mmenu = $('#my-menu');
    var $mmenu = mmenu.mmenu({
        "pageScroll": true,
        "navbar": {
            "title" : "HAPPY&PREGNANT",
        },
        "extensions": [
            // "position-front",
            // "fx-listitems-slide",
            "fullscreen",

        ],
    }, {
        offCanvas: {
            pageSelector: "#page-wrapper"
        },
        "autoHeight": true
    });

    var mmenuBtn = $("#toggle-mnu");
    var API = $mmenu.data("mmenu");

    mmenuBtn.click(function() {
        API.open();
        $(this).addClass('on')
    });

    $('#mm-close-btn').click(function(e){
        e.preventDefault();
        API.close();
    });

    API.bind( "close:start", function() {
        setTimeout(function() {
            mmenuBtn.removeClass( "on" );
        }, 300);
    });
    /**
     * end mobile-mnu customization
     */


    $('.problems-slider').on('afterChange init', function(event, slick, direction){
            // console.log('afterChange/init', event, slick, slick.$slides);
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');

            // find current slide
            for (var i = 0; i < slick.$slides.length; i++)
            {
                var $slide = $(slick.$slides[i]);
                if ($slide.hasClass('slick-current')) {
                    // update DOM siblings
                    $slide.prev().addClass('prevSlide');
                    $slide.next().addClass('nextSlide');
                    break;
                }
            }
        }
    )
        .on('beforeChange', function(event, slick) {
            // optional, but cleaner maybe
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
        })
        .slick({
            infinite: false,
            initialSlide: 1,
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '100px',
            speed: 300,
            fade: false,
            cssEase: 'linear',
            autoplay: false,
            draggable: false,
            adaptiveHeight: false,
            dots: false,
            prevArrow: "<button type='button' class='slick-prev'></button>",
            nextArrow: "<button type='button' class='slick-next'></button>",
            responsive: [
                {
                    breakpoint: 479,
                    settings: {
                        centerPadding: '40px',
                    }
                }
            ]

        });




    var $status = $('.slides-count');

    $('.reviews-slider').on('afterChange init', function(event, slick, currentSlide, nextSlide){
            // console.log('afterChange/init', event, slick, slick.$slides);
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');

            // find current slide
            for (var i = 0; i < slick.$slides.length; i++)
            {
                var $slide = $(slick.$slides[i]);
                if ($slide.hasClass('slick-current')) {
                    // update DOM siblings
                    $slide.prev().addClass('prevSlide');
                    $slide.next().addClass('nextSlide');
                    break;
                }
            }

        var i = (currentSlide ? currentSlide : 0) + 1;
        $status.text(i + ' из ' + slick.slideCount);

        }
    )
        .on('beforeChange', function(event, slick) {
            // optional, but cleaner maybe
            // remove all prev/next
            slick.$slides.removeClass('prevSlide').removeClass('nextSlide');
        })
        .slick({
            infinite: true,
            // initialSlide: 1,
            slidesToShow: 1,
            centerMode: true,
            centerPadding: '280px',
            speed: 500,
            fade: false,
            cssEase: 'linear',
            autoplay: false,
            draggable: false,
            adaptiveHeight: false,
            dots: false,
            prevArrow: "<button type='button' class='slick-prev'></button>",
            nextArrow: "<button type='button' class='slick-next'></button>",
            responsive: [
                {
                    breakpoint: 1199,
                    settings: {
                        centerPadding: '160px',
                    }
                },

                {
                    breakpoint: 991,
                    settings: {
                        centerPadding: '0',
                        adaptiveHeight: true,
                        draggable: true,
                    }
                }
            ]

        });




    $('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if(!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });


    var uPhone = $('.user-phone');
    uPhone.mask("+7 (999) 999-99-99",{autoclear: false});

    uPhone.on('click', function (ele) {
        var needelem = ele.target || event.srcElement;
        needelem.setSelectionRange(4,4);
        needelem.focus();
    });

    $.validate({
        form : '.contact-form',
        scrollToTopOnError: false
    });


    function heightses() {
        if ($(window).width()>=991) {
            $(".adv-item").height('auto').equalHeights();
            $(".videocom-title").height('auto').equalHeights();
        }
    }

    $(window).resize(function() {
        heightses();
    });

    heightses();


    /**
     * YOUTUBE SCRIPT
     */
    var tag = document.createElement('script');
    tag.src = "//www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var videoPlayers = [];
    var i = 0;

    onYouTubeIframeAPIReady = function () {
        $('.video-player .you-player').each(function(){
            var $playerID = $(this).attr("id");
            var $videoID = $(this).parents('.video-player').data("video");
            var $start = $(this).siblings('.start-video');

            $start.attr("data-playern", i);

            $start.on('click', function(){
                var playerN = $(this).attr("data-playern");
                $(this).hide();
                $(this).siblings('.you-player').show();
                $(this).siblings('.thumbnail-container').hide();


                videoPlayers[i] = new YT.Player($playerID, {
                    videoId: $videoID,
                    playerVars: {
                        'autoplay': 0,
                        'rel': 0,
                        'showinfo': 0
                    },
                    events: {
                        'onStateChange': onPlayerStateChange
                    }
                });

                if(videoPlayers[i])
                {
                    var fn = function(){ videoPlayers[i].playVideo(); };
                    setTimeout(fn, 1500);
                }

            });
            i++;
        });
    };

    var p = document.getElementsByClassName("you-player");
    $(p).hide();

    onPlayerStateChange = function (event) {
        if (event.data == YT.PlayerState.ENDED) {
            $('.you-player').hide();
            $('.start-video').fadeIn('normal');
            $('.thumbnail-container').fadeIn('normal');
        }
    };
    /**
     * end YOUTUBE SCRIPT
     */


    //E-mail Ajax Send
    $("form").submit(function() { //Change
        var th = $(this);

        $.ajax({
            type: "POST",
            url: "mail.php", //Change
            data: th.serialize()
        }).done(function() {

        });
        return false;
    });
});

