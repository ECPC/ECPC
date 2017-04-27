
var page = {
    ready: function(){
        $(window).scroll(page.onScrollDown);
        $("#tabRegistrar, #tabIniciar").on("click", page.onModalTabClick);
        $("input").on("input", page.onInputKeyDown);
        $("input").focusout(page.onInputFocusOut);
        $('#lnkLogIn').click(page.onLogInClick);
        $('#lnkSignIn').click(page.onSignInClick);
        $('#logInModal').on('show.bs.modal', page.onModalShow);
    },
    onLogInClick: function(){
        
    },
    onSignInClick: function(){

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
        } else {
            navBars.addClass("navbar-absolute");
            navBars.removeClass("navbar-fixed-top");
            logIn.show();
        }
    },
    onModalShow: function(event){
        var button = $(event.relatedTarget); // Button that triggered the modal
        var tabIndex = button.data('tab'); // Extract info from data-* attributes
        var modal = $(this);

        if( tabIndex == 0){
            $("#tabRegistrar").addClass('form-header-active');
            $("#frmRegistrar").show();
            $("#tabIniciar").removeClass('form-header-active');
            $("#frmIniciar").hide();
        }
        else if(tabIndex == 1){
            $("#tabRegistrar").removeClass('form-header-active');
            $("#frmRegistrar").hide();
            $("#tabIniciar").addClass('form-header-active');
            $("#frmIniciar").show();
        }

        console.log(tabIndex);
    },
    onModalTabClick: function(){
        $("#frmRegistrar, #frmIniciar").slideToggle('fast');
        $("#tabRegistrar, #tabIniciar").toggleClass('form-header-active');
    },
    onInputKeyDown: function(){
        var label = $(this).parent('div.form-group').find('label.form-label');
        if ($(this).val() === "" && !label.hasClass('hidden-label')) {
            label.addClass('hidden-label');
            label.slideDown('200');
        }
        if ($(this).val() !== "" && label.hasClass('hidden-label')) {
            label.slideDown('200');
            label.removeClass('hidden-label')
        }
    },
    onInputFocusOut: function() {
        var label = $(this).parent('div.form-group').find('label.form-label');
        if ($(this).val() !== "") {
            label.addClass('visible-label');
        } else {
            label.removeClass('visible-label');
        }
    }
};

$(document).ready(page.ready);
