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
        $.ajax({
			type : 'GET',
			url : "/api/user/progressInfo"})
		.done(function(usuario){
			$(".currentUserPoints").text(usuario.points);
			$(".currentUserPointsLeft").text(100-usuario.points);
			$(".currentUserChilds").text(usuario.partners);
			$(".currentUserEarnings").text(usuario.earnings);
			$(".currentUserProgressBar").width(usuario.points+"%");
		});
    }
}

$(document).ready(sideNav.ready);