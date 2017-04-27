
var page = {
    ready: function(){
        $(window).scroll(page.onScrollDown);
    },
    onScrollDown: function(){
        var scroll = $(window).scrollTop();
        var navBars = $("nav");
        var navBar = $(navBars.get(1));
        var logIn = navBar.find("ul li:first-child");
        if( scroll >= 700 ){
            navBars.removeClass("navbar-absolute");
            navBars.addClass("navbar-fixed-top");
            logIn.hide();
        }else{
            navBars.addClass("navbar-absolute");
            navBars.removeClass("navbar-fixed-top");
            logIn.show();
        }
    }
};

$(document).ready(page.ready);
