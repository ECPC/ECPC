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