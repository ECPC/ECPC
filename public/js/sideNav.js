//Comprobar sesion con el servidor antes de que la pagina cargue.
(function (){
	var response = 
		$.ajax({
			type: 'GET',
			url: '/api/isLogged',
			async: false
		}).responseText;
	if(response === "false"){
		window.location = "/";
	}
})();

var sideNav = {
    ready: function(){
        sideNav.obtenerDatos();
		$('#menuBtn').click(sideNav.onMenuBtnClick);
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
			let usuarioPoints = Number(usuario.points);
			$(".currentUserPoints").text(usuarioPoints);
			$(".currentUserPointsLeft").text(usuarioPoints>100 ? 0 : 100-usuarioPoints);
			$(".currentUserChilds").text(usuario.partners);
			$(".currentUserEarnings").text(usuario.earnings);
			$(".currentUserProgressBar").width(usuario.points+"%");
		});
    },
	onMenuBtnClick: function(e){
		$('#sidepanel').toggleClass('expanded');
		$('#maincontent').toggleClass('expanded');
	}
}

$(document).ready(sideNav.ready);