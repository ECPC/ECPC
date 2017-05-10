var onboardingBuilder = {
    attachButtons: function(tour, steps){
        for(var i = 0; i < steps.length; i++){
            var buttons = [];
            if(i > 0){
                buttons.push({
                    text: 'Anterior',
                    classes: 'shepherd-button-secondary btn dark',
                    action: function(){
                        return tour.back();
                    }
                });
            }else{
                buttons.push({
                    text: 'Cerrar',
                    classes: 'shepherd-button-secondary btn dark',
                    action: function(){
                        return tour.hide();
                    }
                });
            }
            if( i != (steps.length-1) ){
                buttons.push({
                    text: 'Siguiente',
                    classes: 'shepherd-button-primary btn highlight dark',
                    action: function(){
                        return tour.next();
                    }
                });
            } 
            else {
                buttons.push({
                    text: 'Cerrar',
                    classes: 'shepherd-button-primary btn highlight dark',
                    action: function(){
                        return tour.hide();
                    }
                });
            }
            steps[i].buttons = buttons;
        }
        return steps;
    },
    attachToTour: function(tour, steps){
        for(var i = 0; i < steps.length; i++){
            tour.addStep('step_'+i, {
                attachTo: steps[i].attachTo,
                title: steps[i].title,
                text: steps[i].text,
                buttons: steps[i].buttons
            });
        }
    }
}

var onboardingProgress = {
    progress: {
        userId: 0,
        dashboard: false,
        configuracion: false,
        tienda: false
    },
    save: function(){
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("onboardingProgress", JSON.stringify(onboardingProgress.progress));
            if(onboardingProgress.progress.dashboard && onboardingProgress.progress.configuracion && onboardingProgress.progress.tienda){  
                $.ajax({
                    type : 'GET',
                    url : "/api/user/onboardingComplete"})
                .done(function(response){
                    console.log(response);
                });
            }
        } else {

        }
    },
    load: function(){
        var localProgress = JSON.parse(localStorage.getItem('onboardingProgress'));
        if( localProgress != undefined){
            onboardingProgress.progress = localProgress;
        }
    },
    serverload: function(){
        $.ajax({
			type : 'GET',
			url : "/api/user"
        }).done(function(usuario){
            onboardingProgress.load();

            if(usuario.id != onboardingProgress.progress.userId){
                onboardingProgress.progress.userId = usuario.id;
                onboardingProgress.progress.dashboard = usuario.onboarding;
                onboardingProgress.progress.configuracion = usuario.onboarding;
                onboardingProgress.progress.tienda = usuario.onboarding;
            } else{
                onboardingProgress.progress.userId = usuario.id;
                onboardingProgress.progress.dashboard = (usuario.onboarding || onboardingProgress.progress.dashboard);
			    onboardingProgress.progress.configuracion = (usuario.onboarding || onboardingProgress.progress.configuracion);
			    onboardingProgress.progress.tienda = (usuario.onboarding || onboardingProgress.progress.tienda);
            }
			
            onboardingProgress.save();

			$(document).trigger('onboarding');
		});
    }
}