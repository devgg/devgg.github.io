$(window).on("load",function(){var email="flo.gauger@gmail.com";var links={github:"https://github.com/devgg",linkedin:"https://de.linkedin.com/in/floriangauger",resume:"res/resume.pdf",fonticon:"http://gauger.io/fonticon",viewicon:"http://gauger.io/viewicon",hermes:"https://github.com/devgg/hermes",robozen:"https://github.com/devgg/roboZen"};var $window=$(window);var $body=$("body");var $intro=$("#intro");var $navBar=$("#nav_bar");var $navItemContainer=$("#nav_item_container");var navOffsetTop;function resize(){$body.removeClass("nav_docked");navOffsetTop=$intro.offset().top-$navBar.outerHeight();scroll()}function scroll(){if(navOffsetTop<=$window.scrollTop()&&!$body.hasClass("nav_docked")){$body.addClass("nav_docked");$navItemContainer.addClass("container")}if(navOffsetTop>$window.scrollTop()&&$body.hasClass("nav_docked")){$body.removeClass("nav_docked");$navItemContainer.removeClass("container")}}$(".nav_item").click(function(){var $target=$($(this).data("target"));$("html, body").animate({scrollTop:$target.offset().top-$navBar.outerHeight()},500)});function scrollTo(hash){location.hash="#"+hash}function init(){$window.scroll(scroll);$window.resize(resize);$(".parallax").parallax();$("#home").parallax({imageSrc:"img/j.jpg"});resize()}init();$(".link").click(function(){window.open(links[$(this).data("link")],"_blank");event.stopPropagation()});$("#email").click(function(){openEmailClient(email);event.stopPropagation()});var $contact=$("#contact");var $contactForm=$("#contact_form");var $contactEmail=$("#contact_email");var $contactSubject=$("#contact_subject");var $contactMessage=$("#contact_message");$contactForm.submit(function(event){sendEmail();event.preventDefault()});function sendEmail(){emailSending();$.ajax({headers:{Accept:"application/json"},url:"https://formspree.io/"+email,method:"POST",data:{mail:$contactEmail.val(),_subject:$contactSubject.val(),message:$contactMessage.val()},dataType:"json",beforeSend:emailSending,success:emailSentSuccess,error:emailSentError})}function emailSending(){$contact.addClass("sending")}function emailSentSuccess(){emailOutAnimation(true,300)}function emailSentError(){emailOutAnimation(false,1e3)}function emailOutAnimation(success,timeAfterReply){var subject=$contactSubject.val();var message=$contactMessage.val();$contactEmail.val("");$contactSubject.val("");$contactMessage.val("");var clazz=success?"success":"error";window.setTimeout(function(){$contact.addClass(clazz);window.setTimeout(function(){$contact.addClass("move_out");window.setTimeout(function(){$contact.removeClass("sending");window.setTimeout(function(){$contact.removeClass(clazz);$contact.removeClass("move_out");if(!success){openEmailClient(email,subject,message)}},500)},500)},timeAfterReply)},2e3)}function openEmailClient(email,subject,content){var command="mailto:"+email;if(subject!==undefined){command+="?subject="+subject}if(content!==undefined){command+="&body="+content}window.location.href=command}});