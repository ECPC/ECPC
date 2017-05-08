var page = {
    ready: function(){
        $('#selectMetod').on('change', page.onSelectMetodChange);
    },
    onSelectMetodChange: function(){
        var val = $('#selectMetod').val();
        console.log(val);
    }
}


$(document).ready(page.ready);