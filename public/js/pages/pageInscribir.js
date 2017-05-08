var page = {
    ready: function(){
        			//Hay que evitar que el form refresque la página
			$("#frmInscribir").submit(page.onFrmInscribirSubmit);
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
            console.log("done");
        });
    }
};

$(document).ready(page.ready);