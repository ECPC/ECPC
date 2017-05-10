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
    },
    _foreach(_array, callback){
    	for(var i = 0; i < _array.length; i++){
    		callback(_array[i]);
    	}
    }
};

$(document).ready(page.ready);