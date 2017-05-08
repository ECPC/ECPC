var page ={
    ready: function(){
        $.ajax({method: "GET", url: "/api/token"})
        .done(function(msg){
            $(".formToken").attr("value", msg);
        });
    	$.get("/api/cart", function(products){
    		var orderAmount = 0;
    		page._foreach(products, function(item){
    			var product = $("#row-template").clone();
    			product.attr("id", item.id);
    			product.find("#productID").val(item.id);
    			product.find("#productName").text(item.name);
    			product.find("#productPrice").text(item.price);
    			product.find("#quantity").val(item.quantity).change(function(){
    				let row = $("#"+item.id);
    				let price = row.find("#productPrice").text();
    				let quantity = $(this).val();
    				row.find("#productTotalPrice").text(Number(quantity) * Number(price));
    				page.calculateOrderTotal();
    			});
    			product.find("#productTotalPrice").text(item.price * item.quantity);
    			product.find("#productImage").attr("src",item.image_path_min);
    			product.find("#productLink").attr("href","/sub/producto.html?product_id="+item.id);
    			product.find("#removeProductLink").attr("href", "/api/cart/"+item.id+"/removeProduct");
    			orderAmount += item.price * item.quantity;
    			$("#cart-container").append(product);
    			product.show();
    		});
    		$("#row-template").remove();
    		$("#orderAmount").text(orderAmount);
    		if(products.length > 0){
    			$("#buyButton").show();
    		}
    		$("#frmPagar").show("slow");
    		$("#cargando").hide("slow");
    	});
    },
    _foreach(_array, callback){
    	for(var i = 0; i < _array.length; i++){
    		callback(_array[i]);
    	}
    },
    calculateOrderTotal(){
		var orderAmount = 0;
		$(".productTotal").each(function(){
			orderAmount += Number($(this).text());
		});
		$("#orderAmount").text(orderAmount);
    }
};

$(document).ready(page.ready);