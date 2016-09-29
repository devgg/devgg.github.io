$(window).on('load', function () {
    $(".focus").keyup(function(e) {
        var inputs = $('#solution').find('.focus');
        if(e.keyCode == 8 || e.keyCode == 37) {
            var newIndex = Math.max(0, inputs.index(this) - 1);
            placeCaretAtEnd(inputs.eq(newIndex).get(0));
        } else if ((e.keyCode > 64 && e.keyCode < 91) || (e.keyCode > 96 && e.keyCode < 123)) {
            $(this).text(String.fromCharCode(e.keyCode).toLowerCase());
            var newIndex = Math.min(inputs.length - 1, inputs.index(this) + 1);
            placeCaretAtEnd(inputs.eq(newIndex).get(0));
        } else if(e.keyCode == 32 || e.keyCode == 39) {
            var newIndex = Math.min(inputs.length - 1, inputs.index(this) + 1);
            placeCaretAtEnd(inputs.eq(newIndex).get(0));
        } else {
            $(this).text("");
        }
    });
});


function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
        && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

