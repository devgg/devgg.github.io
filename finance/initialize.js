$(function () {
    var quandlApiKeyHref = "https://www.quandl.com/docs/api#getting-an-api-key";
    var quandlCodeHref = "https://www.quandl.com/data/GOOG?keyword=";
    var colorApi = "#d35400";
    var colorCode = "#46aa96";
    var colorCharts = "#2980b9";

    var codes = [];
    var $graphs_container = $("#graphs_container");
    var $form_container = $("#form_container");

    var apiKey = $.query.get('apiKey');
    if ($.query.get('codes') !== "") {
        codes = codes.concat($.query.get('codes'));
    }
    initialize();

    function initialize() {
        $graphs_container.empty();
        if (apiKey === "") {
            animateBackground(colorApi);
            $form_container.html(getApiKeyForm());
        } else {
            if (codes.length == 0) {
                animateBackground(colorCode);
            }
            $form_container.html(getEmptyChartsForm());
            codes.forEach(function (code) {
                addChart(code);
            });
        }
    }


    function getApiKeyForm() {
        function submitKey() {
            apiKey = $("#apiKeyTextField").val();
            history.replaceState(null, null, "index.html?apiKey=" + apiKey);
            initialize();
        }

        return createTextBox("apiKeyTextField", "Enter Quandl API key", "obtain from ", quandlApiKeyHref, submitKey);
    }

    function getEmptyChartsForm() {
        function submitCode() {
            var $codeTextField = $("#codeTextField");
            var code = $codeTextField.val();
            $codeTextField.val("");
            if (codes.indexOf(code) === -1) {
                addChart(code);
            }

        }

        return createTextBox("codeTextField", "Enter Quandl Code (e.g. GOOG/NASDAQ_AAPL)", "find ", quandlCodeHref, submitCode);
    }


    function addChart(code) {
        var quandl = new Quandl(code);
        var $div = $("<div>").attr("id", quandl.id);
        $graphs_container.append($div);
        $.get("https://www.quandl.com/api/v3/datasets/" + quandl.code + ".json?api_key=" + apiKey, function (data, textStatus) {
            animateBackground(colorCharts);
            if (codes.indexOf(code) === -1) {
                history.replaceState(null, null, "index.html" + location.search + "&codes[]=" + code);
                codes.push(code);
            }
            $div.addClass("graph_container").append($("<div>").text(quandl.name));
            quandl.setResult(data);
            createGraph(quandl.formatedResult, quandl.id);
        }).fail(function() {
            $div.remove();
        });
    }

    function createTextBox(id, placeholder, message, href, submitFunc) {
        var $textField = $("<input>").prop("type", "text").attr("id", id).attr("placeholder", placeholder).on('keyup change', function (event) {
            if (event.keyCode == 13) {
                submitFunc();
            }
        });
        var $href = $("<a>").attr('href', href).attr("target", "blank").text("here");
        var $textMessage = $("<div>").text(message).append($href);
        return $().add($textField).add($textMessage);
    }

    function animateBackground(color) {
        $("html").animate({backgroundColor: color}, 'slow');
    }
});










