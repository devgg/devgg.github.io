$(window).on('load', function () {

    $(".solution").on("input", addLetters);

    function addLetters() {
        var letters = Array.apply(null, Array(27)).map(function () {});
        $("tr:nth-child(-n + 3) > td").each(function() {
            addLetter(letters, $(this), 0);
        });
        $("tr:nth-child(4) > .editable, tr:nth-child(5) > .editable, tr:nth-child(6) > .editable").each(function() {
            addLetter(letters, $(this), 9);
        });
        $("tr:nth-child(n + 7) > .editable").each(function () {
            addLetter(letters, $(this), 18);
        });
        buildSolution(letters);
    }

    function addLetter(letters, $this, setoff) {
        var position = parseInt($this.text());
        var letter = $this.data('value');
        if (letter !== undefined) {
            for (var i = 0; i < 9; i++) {
                if (letters[setoff + i] === letter) {
                    letters[setoff + i] = undefined;
                }
            }
            if (!isNaN(position) && position > 0 && position < 10) {
                letters[setoff + position - 1] = letter;
            }
        }
    }

    function buildSolution(letters) {
        var solution = "fgauger.com/";
        for (var i = 0; i < letters.length; i++) {
            if (letters[i] != undefined) {
                solution += letters[i];
            }
        }
        while (solution.length < 28) {
            solution += "_";
        }
        $("#solution").text(solution);
    }
});