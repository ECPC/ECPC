var page = {
    ready: function(){
        $.ajax({
			type : 'GET',
			url : "/api/user/selfPartnerNet"})
		.done(function(data){
			page.initNodeChart(data);
		});
    },
	myConfig: {
	    chart: {
	        container: "#collapsable-example",

	        animateOnInit: true,
	        
	        node: {
	            collapsable: true
	        },
	        animation: {
	            nodeAnimation: "easeOutBounce",
	            nodeSpeed: 700,
	            connectorsAnimation: "bounce",
	            connectorsSpeed: 700
	        }
	    },
	    nodeStructure: {}
	},
	usersInfo: {},
	initNodeChart: function (data)
	{
	    usersInfo = {};
	    chart_config = myConfig;
	    //
	    var node = chart_config.nodeStructure;
	    page.usersInfo[String(data.id)] = data;
	    node.text = { name : "" };
	    node.text.name = data.name;
	    node.image = "/img/user-icon-dark.png";
	    node.HTMLid = data.id;
	    page.setChildren(node, data);
	    tree = new Treant(chart_config);
	    //
	    page.fillPartnerInfo(data.id);
	    $(".chart div").mouseenter(function(){
	        var user_id = $(this).attr('id');
	        page.fillPartnerInfo(user_id);
	    });
	},
	setChildren: function (node, data){
	    node.children = [];
	    for(var i = 0; i < data.childs.length; i++){
	        var child = data.childs[i];
	        page.usersInfo[String(child.id)] = child;
	        node.children.push({
	            text : { name : child.name},
	            image : "/img/user-icon-dark.png",
	            HTMLid : child.id
	        });
	        var lastNode = node.children[node.children.length - 1];
	        page.setChildren(lastNode, child);
	    }
	},
	fillPartnerInfo: function(user_id){
		let user = page.usersInfo[user_id];
		let fullName = user.name;
		if(user.apellido_paterno != null){
			fullName += " " + user.apellido_paterno;
		}
		if(user.apellido_materno != null){
			fullName += " " + user.apellido_materno;
		}
	    $("#partnerName").text(fullName);
	    $("#userEmail").text(page.usersInfo[user_id].email);
	    $("#userPoints").text(page.usersInfo[user_id].points);
	    $("#userEarnings").text(page.usersInfo[user_id].earnings);
	    $("#userPartners").text(page.usersInfo[user_id].child_count);
	}
};

$(document).ready(page.ready);