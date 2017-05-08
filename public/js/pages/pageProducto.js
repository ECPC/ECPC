var page = {
    ready: function(){
        var product_id = getParameterByName("product_id");
        page.loadProduct(product_id);
    },
    loadProduct: function(productId){
        $.ajax({
			type : 'GET',
			url : "/api/product/"+productId})
		.done(function(producto){
            $("#productID").attr("value", producto.id);
			$("#productName").text(producto.name);
			$("#productDescription").text(producto.description);
			$("#productPrice").text("$"+producto.price);
			$("#productImage").attr("src", producto.image_path);
            $("#agregarButton").show("fast");
		});
    }
};

//Util función para obtener los query string de la URL
//http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(page.ready);