$(window).on("load", function () {
    var $drop = $("#drop");
    var canvas = document.getElementById('viewport');
    var context = canvas.getContext('2d');

    function imageToFavicon(files) {
        if (files[0]) {
            createImageBitmap(files[0]).then(function (resp) {
                canvas.width = resp.width;
                canvas.height = resp.height;
                context.drawImage(resp, 0, 0);
                canvasToFavicon(canvas);
            }).catch(function (e) {
                console.log(e);
            });
        }
    }

    $drop.on("dragover", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).addClass('dragging');
    });

    $drop.on("dragleave", function (event) {
        event.preventDefault();
        event.stopPropagation();
        $(this).removeClass('dragging');
    });

    $drop.on("drop", function (event) {
        event.preventDefault();
        event.stopPropagation();
        imageToFavicon(event.originalEvent.dataTransfer.files);
    });

    $("#imageInput").on("change", function () {
        imageToFavicon(this.files);
    });
});