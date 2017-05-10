var page = {
    ready: function(){
        page.obtenerUltimasCompras();
    },
    obtenerUltimasCompras: function(){
        $.get("/api/order/history", function(response){
			//console.log(response);
			_foreach(response, function(item){
				var order = $("#order-template").clone();
				page.llenarCampos(order, item);
				$("#compras-container").append(order);
				//$("#compras-container").append('<div class="borderBottom"></div>');
				order.show("fast");
			});
            $(".product").show();
		});
    },
    llenarCampos: function(orden, data){
        orden.find("#toggler").attr("data-target", "#compra"+data.id);
		orden.find(".collapse").attr("id", "compra"+data.id);
		orden.find("#idCompra").text(data.id);
		orden.find("#orderDate").text(data.created_at);
		orden.find("#previewTotal").text(data.total_price);
		orden.find("#orderTotalPrice").text("$"+data.total_price);
		_foreach(data.products, function(item){
			var product = $("#product-template").clone();
			var productName = product.find("#productName").text(item.name);
			productName.attr("href", "/sub/producto.html?" + "product_id=" + item.id);
			product.find("#productCount").text(item.count);
			product.find("#productPrice").text("$"+item.price);
			product.find("#productTotal").text("$"+item.total_price);
			//console.log(product);
			orden.find("#productSection").append(product);
			product.addClass("product");
		});
    }
};

function _foreach(_array, callback){
    for(var i = 0; i < _array.length; i++){
        callback(_array[i]);
    }
}

$(document).ready(page.ready);