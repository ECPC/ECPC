var page = {
     ready: function(){
         $(window).scroll(page.onScrollDown);
         $("#tabRegistrar, #tabIniciar").on("click", page.onModalTabClick);
         $("input").on("input", page.onInputKeyDown);
         $("input").focusout(page.onInputFocusOut);
         $('#btnLogIn').click(page.onLogInClick);
         $('#btnSignIn').click(page.onSignInClick);
         $('#logInModal').on('show.bs.modal', page.onModalShow);
         page.getToken();
     },
     getToken: function(){
         //Puedes obtener el valor del token con la siguiente ruta
         $.ajax({method: "GET", url: "/api/token"})
         .done(function(msg){
             //Le concatenamos el valor del token al atributo oculto del form,
             //esto nos permitira poder llevar a cabo la petición mediante el
             //método POST
             $(".formToken").attr("value", msg);
         });
     },
     onLogInClick: function(){
         var data = $('#frmIniciar').serialize();
         console.log(data);
         $.ajax({
             type : 'POST',
             url : "/api/login", 
             data : $('#frmIniciar').serialize()})
         .done(function(response){
             //Checamos la respuesta del servicio
             if(response.status == "OK"){
                 //Redireccionamos a donde sea que la respuesta nos mande
                 window.location = response.redirect;
             }
             else{
                 //Credenciales incorrectas
                 if(response.message == "1"){
                     alertify.error('No se pudo iniciar sesión. El usuario o contraseña no existen.');
                 }
                 //Hay que validar la identidad
                 else if(response.message == "0"){
                     window.location = response.redirect;
                 }
             }
         });
     },
     onSignInClick: function(){
         var data = $('#frmRegistrar').serialize();
         console.log(data);
         $.ajax({
             type : 'POST',
             url : "/api/user/create", 
             data : $('#frmRegistrar').serialize()})
         .done(function(response){
             //Checamos la respuesta del servicio
             if(response.status == "OK"){
                 //Redireccionamos a donde sea que la respuesta nos mande
                 window.location = response.redirect;
             }
             else{
                 alertify.error('Hubo un error al registrarse, por favor verifique que no hay campos vacios.');
             }
         });
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
