$(document).ready(function () {
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
});