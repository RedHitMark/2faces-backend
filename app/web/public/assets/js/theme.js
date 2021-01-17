(function($) {
    "use strict";

    //=========================
    //  Active current menu while scrolling
    //=========================

    //ACTIVE CURRENT MENU WHILE SCROLLING
    $(window).on("scroll", function() {
        activeMenuItem($(".nav-menu"));
    });
    // function for active menuitem
    function activeMenuItem($links) {
        var top = $(window).scrollTop(),
            windowHeight = $(window).height(),
            documentHeight = $(document).height(),
            cur_pos = top + 2,
            sections = $("section"),
            nav = $links,
            nav_height = nav.outerHeight(),
            home = nav.find(" > ul > li:first");


        sections.each(function() {
            var top = $(this).offset().top - nav_height - 40,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("active");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("active");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("active");
                home.addClass("active");
            } else if ($(window).scrollTop() + windowHeight > documentHeight - 400) {
                nav.find("> ul > li > a").parent().removeClass("active");
            }
        });
    }


    //=========================
    // Smoth Scroll
    //=========================
    function smoothScrolling($links, $topGap) {
        var links = $links;
        var topGap = $topGap;

        links.on("click", function() {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
                if (target.length) {
                    $("html, body").animate({
                        scrollTop: target.offset().top - topGap
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
            return false;
        });
    }

    $(window).on("load", function() {
        smoothScrolling($(".main-menu > nav > ul > li > a[href^='#']"), 70);
    });


    //=========================
    // Slick Nav Activation
    //=========================
    $('.nav-menu > ul').slicknav({
        'prependTo': '.mobile_menu'
    });


    /*------------------------------
         counter
    ------------------------------ */
    $('.counter').counterUp({
        delay: 20,
        time: 2000
    });
}(jQuery));