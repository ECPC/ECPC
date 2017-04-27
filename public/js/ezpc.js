
var page = {
    ready: function(){
        $(window).scroll(page.onScrollDown);
        $("#tabRegistrar, #tabIniciar").on("click", page.onModalTabClick);
        $("input").on("input", page.onInputKeyDown);
        $("input").focusout(page.onInputFocusOut);
        $('#btnLogIn').click(page.onLogInClick);
        $('#btnSignIn').click(page.onSignInClick);
        $('#logInModal').on('show.bs.modal', page.onModalShow);
        var ctx = $("#myChart");
        var ctx2 = $("#myChart2");
        var data = {
            type: 'line',
            data: {
                labels: ["Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
                datasets: [{
                    label: 'Historial de puntos',
                    data: [89, 100, 90, 105, 85, 68],
                    backgroundColor: [
                        'rgba(99, 99, 255, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                // scales: {
                //     yAxes: [{
                //         ticks: {
                //             beginAtZero:true
                //         }
                //     }]
                // }
            }
        };
        var data2 = {
            type: 'bar',
            data: {
                labels: ["Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
                datasets: [{
                    label: 'Historial de ganancias',
                    data: [960, 850, 590, 410, 700, 760],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        };
        var myChart2 = new Chart(ctx2, data2);
        var myChart = new Chart(ctx, data);

            $("div.status img").on("mouseenter", function() {
            $("div.status-help-container").fadeIn('100', function() {
                // $("div.status-help-container").fadeOut('200');
            });
        });
        $("div.status img").on("mouseleave", function() {
            $("div.status-help-container").fadeOut('100', function() {
                // $("div.status-help-container").fadeOut('200');
            });
        });
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
                $("#mensaje").text("No se pudo iniciar sesión");
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
                //No se pudo registrar
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
