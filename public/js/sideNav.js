var sideNav = {
    ready: function(){
        sideNav.obtenerDatos();
    },
    obtenerDatos: function(){
        $.ajax({
			type : 'GET',
			url : "/api/user"})
		.done(function(usuario){
			$("#name").text(usuario.name);
			$("#id").text(usuario.id);
		});
    }
}

$(document).ready(sideNav.ready);