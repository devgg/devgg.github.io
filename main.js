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

    var animEndEventNames = {
        'WebkitAnimation': 'webkitAnimationEnd',
        'OAnimation': 'oAnimationEnd',
        'msAnimation': 'MSAnimationEnd',
        'animation': 'animationend'
    };
    // animation end event name
    var animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
    // support css animations
    var support = Modernizr.cssanimations;


    $(".navigation_right").click(changePage.bind(changePage, true));
    $(".navigation_left").click(changePage.bind(changePage, false));


    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:
                changePage(false);
                break;
            case 39:
                changePage(true);
                break;
        }
        e.preventDefault();
    });


    var animating = false;
    var currentPage = 0;
    var $pages = $(".page");
    //var footerColors = ["#F34A53", "#4B515D", "#4B515D"];
    //var footerColors = ["#4B515D", "#4B515D", "#4B515D"];


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

            //$("#footer").css("background-color", footerColors[currentPage]);
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



    //var $skills_container = $(".skills_container");
    //var container = d3.select(".skills_container");
    //
    //var width = $skills_container.width();
    //var height = $skills_container.height();
    //
    //var skillNodes = [
    //    {id: "java", logo: "java.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "javascript", logo: "js.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "css", logo: "css.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "git", logo: "git.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "cpp", logo: "cpp.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "jquery", logo: "jquery.svg", radius: 100, radiusSmall: 100, radiusBig: 200},
    //    {id: "html", logo: "html.svg", radius: 100, radiusSmall: 100, radiusBig: 200}
    //];
    ////var fillerNodes = d3.range(100).map(function () {
    ////    return {radius: Math.random() * 50 + 10};
    ////});
    //var nodes = skillNodes//.concat(fillerNodes);
    //
    //var collide = d3.forceCollide(function (d) {
    //    return d.radius
    //});
    //
    //var forceSimulation = d3.forceSimulation(nodes)
    //    .force("center", d3.forceCenter(width / 2, height / 2))
    //    .force("attract", d3.forceManyBody().strength(5))
    //    .force("collide", collide);
    //
    //function restartSimulation() {
    //    forceSimulation.alpha(1);
    //    forceSimulation.restart();
    //}
    //
    //function updateSimulationSize() {
    //    width = $skills_container.width();
    //    height = $skills_container.height();
    //    forceSimulation.force("center", d3.forceCenter(width / 2, height / 2));
    //    restartSimulation();
    //}
    //
    //var skillDivs = container.selectAll("div")
    //    .data(nodes)
    //    .enter()
    //    .append("div")
    //    .attr("class", "circle");
    //skillDivs.filter(function (d) {
    //        return d.logo !== undefined;
    //    })
    //    .attr("id", function (d) {
    //        return d.id
    //    })
    //    .style("background-image", function (d) {
    //        return "url(img/logo_" + d.logo + ")";
    //    })
    //    .on("click", function (d) {
    //
    //        if (d.radius === d.radiusSmall) {
    //            expand(d);
    //        } else {
    //            contract(d);
    //        }
    //        for (var i = 0; i < skillNodes.length; i++) {
    //            if (d !== skillNodes[i]) {
    //                contract(skillNodes[i]);
    //            }
    //        }
    //        collide.initialize(nodes);
    //        restartSimulation();
    //    });
    //
    //function expand(skillNode) {
    //    skillNode.radius = skillNode.radiusBig;
    //    $("#" + skillNode.id)
    //        .css("background-image", "url(img/logo_trans_" + skillNode.logo + ")")
    //        .append($("<div>").text(""));
    //}
    //
    //function contract(skillNode) {
    //    skillNode.radius = skillNode.radiusSmall;
    //    $("#" + skillNode.id)
    //        .css("background-image", "url(img/logo_" + skillNode.logo + ")")
    //        .children().remove();
    //}
    //
    //forceSimulation.on("tick", function (e) {
    //    for (var i = 0; i < nodes.length; i++) {
    //        var node = nodes[i];
    //        node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
    //        node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
    //    }
    //
    //    skillDivs.style('left', function (d) {
    //            //d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
    //            return (d.x - d.radius) + 'px';
    //        })
    //        .style('top', function (d) {
    //            //d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
    //            return (d.y - d.radius) + "px"
    //        }).style("width", function (d) {
    //        return 2 * d.radius + "px"
    //    }).style("height", function (d) {
    //        return 2 * d.radius + "px"
    //    });
    //
    //
    //});
});



