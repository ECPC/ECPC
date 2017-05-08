var page = {
    ready: function(){
        	//Hay que evitar que el form refresque la página
            page.getToken();
			$("#frmInscribir").submit(page.onFrmInscribirSubmit);
    },
    getToken: function(){
        //Puedes obtener el valor del token con la siguiente ruta
        $.ajax({method: "GET", url: "/api/token"})
        .done(function(msg){
            $(".formToken").attr("value", msg);
        });
    },
    onFrmInscribirSubmit: function(e){
        e.preventDefault();
        page.onInscribir();
        page.clearForm();
        return false;
    },
    clearForm: function(){
        $('#frmInscribir input').val('');
    },
    onInscribir: function(){
        $.ajax({
        type : 'POST',
        url : "/api/user/subscribe", 
        data : $('#frmInscribir').serialize()})
        .done(function(response){
            //Checamos la respuesta del servicio
            //console.log("done");
            window.location = "/sub/socios.html";
        });
    }
};

$(document).ready(page.ready);