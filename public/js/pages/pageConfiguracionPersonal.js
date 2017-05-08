var page = {
    ready: function(){
    	page.getToken();
    	page.fillUserData();
    },
    getToken: function(){
        //Puedes obtener el valor del token con la siguiente ruta
        $.ajax({method: "GET", url: "/api/token"})
        .done(function(msg){
            $(".formToken").attr("value", msg);
        });
    },
    fillUserData: function(){
    	$.get('/api/user', function(userInfo){
    		$("#txtNombre").val(userInfo.name);
    		$("#txtApellidoPaterno").val(userInfo.apellido_paterno);
    		$("#txtApellidoMaterno").val(userInfo.apellido_materno);
    		$("#txtFechaNacimiento").val(userInfo.birthdate);
    		//true man, false woman
    		if(userInfo.genero!=null){
    			userInfo.genero? $("#radGeneroH").prop("checked", true) : $("#radGeneroM").prop("checked", true);
    		}
    		$("#txtCalleNumero").val(userInfo.calle_numero);
    		$("#txtColonia").val(userInfo.colonia);
    		$("#txtCodigoPostal").val(userInfo.codigo_postal);
    		$("#txtMunicipio").val(userInfo.municipio);
    		$("#txtEstado").val(userInfo.estado);
    		$("#progressBar").width(userInfo.registerProgress+"%");
    		$("#registerProgress").text(userInfo.registerProgress);
    		$("#editButton").show("slow");
    		//console.log(userInfo.registerProgress);
    	});
    }
};

$(document).ready(page.ready);