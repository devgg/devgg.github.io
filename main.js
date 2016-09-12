$(window).on("load", function () {
    var github = "https://github.com/devgg";
    var linkedin = "https://de.linkedin.com/in/floriangauger";
    var email = "flo.gauger@gmail.com";
    var resume = "res/resume.pdf";

    $("#github").click(function () {
        window.open(github, "_blank");
    });

    $("#linkedin").click(function () {
        window.open(linkedin, "_blank");
    });

    $("#email").click(function () {
        window.location.href = "mailto:" + email;
    });

    $("#resume").click(function () {
        window.open(resume, "_blank");
    });

    $("#next").hover(function () {
        $("body").toggleClass("easeOut easeIn");
    });


    $(function () {
        $("#next").typed({
            strings: ["programmer", ""],
            backDelay: 1000,
            loop: true

        });
    });
    //Typed.prototype.backspace = function (curString, curStrPos) {
    //    //if (this.stop === true) {
    //    //    return;
    //    //}
    //    console.log(this.arrayPos);
    //    if (this.arrayPos == 0) {
    //        this.stopNum = 5;
    //    }
    //    // every other time, delete the whole typed string
    //    else {
    //        this.stopNum = 0;
    //    }
    //}

    animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    },
        // animation end event name
        animEndEventName = animEndEventNames[Modernizr.prefixed('animation')],
        // support css animations
        support = Modernizr.cssanimations


    $(".navigation_right").click(changePage.bind(changePage, true));
    $(".navigation_left").click(changePage.bind(changePage, false));


    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: changePage(false);
                break;
            case 39: changePage(true);
                break;
        }
        e.preventDefault();
    });


    var animating = false;
    var currentPage = 0;
    var $pages = $(".page");


    var prevOutClass = 'page-rotateLeftSideFirst';
    var prevInClass = 'page-moveFromLeft page-delay200 page-ontop';
    var nextOutClass = 'page-rotateRightSideFirst';
    var nextInClass = 'page-moveFromRight page-delay200 page-ontop';

    function changePage(next) {
        if (!animating && ((!next && currentPage > 0) || (next && currentPage < $pages.length - 1))) {
            animating = true;
            var $current = $pages.eq(currentPage);
            currentPage += next ? 1 : -1;
            var $next = $pages.eq(currentPage);

            var outClass = next ? nextOutClass : prevOutClass;
            var inClass = next ? nextInClass : prevInClass;


            var firstCallback = true;
            $current.addClass(outClass).off(animEndEventName).on(animEndEventName, endAnimation);
            $next.addClass(inClass + " page-current").off(animEndEventName).on(animEndEventName, endAnimation);

            function endAnimation() {
                if (firstCallback) {
                    firstCallback = false;
                } else {
                    $current.removeClass(outClass + " page-current");
                    $next.removeClass(inClass);
                    animating = false;
                }
            }
        }
    }
});
