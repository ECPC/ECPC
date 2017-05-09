var page = {
    ready: function(){
        $('#selectMetod').on('change', page.onSelectMetodChange);
    },
    onSelectMetodChange: function(){
        var val = $('#selectMetod').val();
        if(val == 1){
            $("#sectionPaypal").slideDown("fast");
            $("#sectionCreditCard").hide();
            /*$("#sectionPaypal").addClass("active");
            $("#sectionCreditCard").removeClass("active");*/
        } 
        else if(val == 2){
            $("#sectionPaypal").hide();
            $("#sectionCreditCard").slideDown("fast");
            /*$("#sectionPaypal").removeClass("active");
            $("#sectionCreditCard").addClass("active");*/
        }
        console.log(val);
    }
}


$(document).ready(page.ready);