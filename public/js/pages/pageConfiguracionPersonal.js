var page = {
    ready: function(){
    	page.getToken();
    	page.fillUserData();
		$(document).on('onboarding', page.onboarding);
		onboardingProgress.serverload();
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
			$("input").each(function(){
				var label = $(this).parent('div.form-group').find('label.form-label');
				if ($(this).val() !== "" && label.hasClass('hidden-label')) {
					label.slideDown('200');
					label.removeClass('hidden-label')
				}
				if ($(this).val() !== "") {
					label.addClass('visible-label');
					$(this).addClass('filled-input');
				} else {
					label.removeClass('visible-label');
					$(this).removeClass('filled-input');
				}
			});
    	});
    },
	steps: [
		{ attachTo: '.onboarding-informacion left', title: 'Información Personal.', text: 'Aquí puedes completar la información de tu perfil. <strong>¡Recuerda!</strong> esta información es necesaria para poder utilizar la tienda.'},
		{ attachTo: '#progressInfo bottom', title: 'Progreso del registro.', text: '¡No podrás realizar compras en la tienda hasta no completar tu registro al <strong>100%</strong>!'},
		{ attachTo: '#editButton left', title: 'Siempre guarda.', text: '¡No olvides guardar tus cambios!'},
		{ attachTo: '.onboarding-tienda right', title: 'Tienda.', text: 'Al terminar tu registro, ¿porqué no das una vuelta por la tienda?'}
	],
    onboarding: function(){
		if(!onboardingProgress.progress.configuracion){
			var tour = new Shepherd.Tour({
				defaults: {
					classes: 'shepherd-theme-dark',
					scrollTo: true
				}
			});

			page.steps = onboardingBuilder.attachButtons(tour, page.steps);

			page.steps[2].buttons[1].action = function(){
				$('#Menu-Reportes').collapse('show');
				return tour.next();
			}

			page.steps[0].buttons[0].action = function(){
				onboardingProgress.progress.configuracion = true;
				onboardingProgress.save();
				return tour.hide();
			}
			page.steps[3].buttons[1].action = function(){
				onboardingProgress.progress.configuracion = true;
				onboardingProgress.save();
				return tour.hide();
			}

			onboardingBuilder.attachToTour(tour, page.steps);

			tour.start();
		}
    }
};

$(document).ready(page.ready);