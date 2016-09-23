$(window).on("load", function () {
    var github = "https://github.com/devgg";
    var linkedin = "https://de.linkedin.com/in/floriangauger";
    var email = "flo.gauger@gmail.com";
    var resume = "res/resume.pdf";

    $("#github").click(function () {
        window.open(github, "_blank");
        event.stopPropagation()
    });

    $("#linkedin").click(function () {
        window.open(linkedin, "_blank");
        event.stopPropagation()
    });

    $("#email").click(function () {
        window.location.href = "mailto:" + email;
        event.stopPropagation()
    });

    $("#resume").click(function () {
        window.open(resume, "_blank");
        event.stopPropagation()
    });

    var $skills = $(".skill");
    $("#default_skill_button").click(function (event) {
        changeSkillTo($skills.eq(Math.floor(Math.random() * $skills.length)));
        event.stopPropagation();
    });

    $skills.click(function (event) {
        changeSkillTo($(this));
        event.stopPropagation();
    });

    $("html").click(contractCurrentSkill);

    var $currentSkill;
    function changeSkillTo($skill) {
        contractCurrentSkill();
        if (!$skill.is($currentSkill)) {
            $currentSkill = $skill;
            expandCurrentSkill();
        } else {
            $currentSkill = undefined;
        }
    }

    function expandCurrentSkill() {
        $currentSkill.stop();
        $currentSkill
            .animate({height: "200px"}, 300)
            .css("padding", "5px 20px")
            .css("background-color", "rgba(243, 74, 83, 0.8)");
        $currentSkill.children().css("color", "white");
    }

    function contractCurrentSkill() {
        if ($currentSkill) {
            $currentSkill.stop();
            $currentSkill
                .animate({height: "16px"}, 300)
                .css("padding", "")
                .css("background-color", "");
            $currentSkill.children().css("color", "");
        }
    }

    $(function () {
        $("#text1").typed({
            strings: ["Hi! I am Florian.^1000"],
            showCursor: false,
            callback: function () {
                $("#text2").typed({
                    strings: ["I like<br>^1000"],
                    showCursor: false,
                    callback: function () {
                        $("#text3").typed({
                            strings: ["programming", "books", "debating", "learning", "designing", "movies", "handball"],
                            backDelay: 1000,
                            loop: true
                        });
                    }
                });
            }

        });
    });

    var $navigation_menu_buttons = $(".navigation_menu_button");
    $navigation_menu_buttons.click(function() {
        var nextPage = $navigation_menu_buttons.index(this);
        if (nextPage !== currentPage) {
            changePage(nextPage);
        }
    });

    $(".navigation_left").click(function(event) {
        changePage(currentPage - 1);
        event.stopPropagation();
    });
    $(".navigation_right").click(function(event) {
        changePage(currentPage + 1);
        event.stopPropagation();
    });


    $(document).keydown(function (event) {
        switch (event.which) {
            case 37:
                changePage(currentPage - 1);
                break;
            case 39:
                changePage(currentPage + 1);
                break;
        }
        event.preventDefault();
    });


    var animationEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    };

    var animationEndEventName = animationEndEventNames[Modernizr.prefixed('animation')];
    var animating = false;
    var currentPage = 0;
    var $pages = $(".page");
    //var footerColors = ["#F34A53", "#4B515D", "#4B515D"];

    var prevOutClass = 'page-rotateLeftSideFirst';
    var prevInClass = 'page-moveFromLeft page-delay200 page-ontop';
    var nextOutClass = 'page-rotateRightSideFirst';
    var nextInClass = 'page-moveFromRight page-delay200 page-ontop';


    function changePage(nextPage) {
        if (!animating && nextPage >= 0 && nextPage < $pages.length) {
            var $current = $pages.eq(currentPage);
            var $next = $pages.eq(nextPage);

            if (animationEndEventName) {
                animating = true;
                $navigation_menu_buttons.eq(currentPage).removeClass("current");
                $navigation_menu_buttons.eq(nextPage).addClass("current");

                var outClass = nextPage > currentPage ? nextOutClass : prevOutClass;
                var inClass = nextPage > currentPage ? nextInClass : prevInClass;
                currentPage = nextPage;

                //$("#footer").css("background-color", footerColors[currentPage]);
                var firstCallback = true;
                $current.addClass(outClass).off(animationEndEventName).on(animationEndEventName, endAnimation);
                $next.addClass(inClass + " page-current").off(animationEndEventName).on(animationEndEventName, endAnimation);

                function endAnimation() {
                    if (firstCallback) {
                        firstCallback = false;
                    } else {
                        $current.removeClass(outClass + " page-current");
                        $next.removeClass(inClass);
                        animating = false;
                    }
                }
            } else {
                $current.removeClass("page-current");
                $next.addClass("page-current")
            }
        }
    }
});



