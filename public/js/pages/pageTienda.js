var page = {
    ready: function(){
		$('#productoGrid').on('submit', 'form', function(){
			$.ajax({
				type : 'GET',
				url : "/api/cart/addToCart", 
				data : $(this).serialize()
			}).done(function(response){
				alertify.success('¡Producto agregado al carrito!.'); 
			});

		});

    	$.get("/api/product", function(products){
    		page._foreach(products, function(item){
    			var product = $("#product-template").clone();
    			product.attr("id", item.id);
				product.find("#productID").attr("value", item.id);
    			product.find("#productName").text(item.name);
    			product.find("#productPrice").text(item.price);
    			product.find("#productImage").attr("src",item.image_path_min);
    			product.find("#productLink").attr("href","/sub/producto.html?product_id="+item.id);
    			$("#product-container").append(product);
    			product.show("slow");
    		});
    	});

		$(document).on('onboarding', page.onboarding);
		onboardingProgress.serverload();
    },
    _foreach(_array, callback){
    	for(var i = 0; i < _array.length; i++){
    		callback(_array[i]);
    	}
    },
steps: [
		{ attachTo: '.onboarding-productos top', title: 'Tienda.', text: 'Aquí podrás hacer tus compras en la aplicación. Puedes hacer clic en un producto para ver mas información.'},
		{ attachTo: '.onboarding-carrito bottom', title: 'Tu carrito.', text: 'Cuando estés listo para pagar, puedes dar clic en este botón para acceder a tu carrito.'},
		{ attachTo: '.onboarding-compras right', title: 'Compras recientes.', text: 'Siempre que lo necesites, tienes tu historial de compras en la sección <strong>Mi actividad</strong>.'}
	],
    onboarding: function(){
		if(!onboardingProgress.progress.tienda){
			var tour = new Shepherd.Tour({
				defaults: {
					classes: 'shepherd-theme-dark',
					scrollTo: true
				}
			});

			page.steps = onboardingBuilder.attachButtons(tour, page.steps);

			page.steps[1].buttons[1].action = function(){
			$('#Menu-Actividad').collapse('show');
				return tour.next();
			}
			page.steps[0].buttons[0].action = function(){
				onboardingProgress.progress.tienda = true;
				onboardingProgress.save();
				return tour.hide();
			}
			page.steps[2].buttons[1].action = function(){
				onboardingProgress.progress.tienda = true;
				onboardingProgress.save();
				return tour.hide();
			}

			onboardingBuilder.attachToTour(tour, page.steps);

			tour.start();
		}
    }
};

$(document).ready(page.ready);