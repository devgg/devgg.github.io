$(window).on('load', function () {
    for (var i = 1; i < 25; i++) {
        $(".placeholder_" + i).width(40).height(40 * i);
    }

    $(".solution > .input").on("input", buildSolution);


    function buildSolution() {
        $(".solution").each(function() {
            var $this = $(this);
            var position = $this.children(".solution_position").text();
            var $solution;
            $("#solution_container > .green").each(function() {
                var $this = $(this);
                if (position === $this.children(".solution_position").text()) {
                    $solution = $this;
                }
            });
            $solution.children(".input").text($this.children(".input").text());
        });
    }
});