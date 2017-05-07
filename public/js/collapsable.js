var myConfig = {
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
};

var usersInfo = {};
function initNodeChart(data)
{
    usersInfo = {};
    chart_config = myConfig;
    //
    var node = chart_config.nodeStructure;
    usersInfo[String(data.id)] = data;
    node.text = { name : "" };
    node.text.name = data.name;
    node.image = "/img/user-icon-dark.png";
    node.HTMLid = data.id;
    setChildren(node, data);
    tree = new Treant(chart_config);
    //
    fillPartnerInfo(data.id);
    $(".chart div").mouseenter(function(){
        var user_id = $(this).attr('id');
        fillPartnerInfo(user_id);
    });
}

function setChildren(node, data){
    node.children = [];
    for(var i = 0; i < data.childs.length; i++){
        var child = data.childs[i];
        usersInfo[String(child.id)] = child;
        node.children.push({
            text : { name : child.name},
            image : "/img/user-icon-dark.png",
            HTMLid : child.id
        });
        var lastNode = node.children[node.children.length - 1];
        setChildren(lastNode, child);
    }
}

function fillPartnerInfo(user_id){
    $("#partnerName").text(usersInfo[user_id].name);
    $("#userEmail").text(usersInfo[user_id].email);
    $("#userPoints").text(usersInfo[user_id].points);
    $("#userEarnings").text(usersInfo[user_id].earnings);
    $("#userPartners").text(usersInfo[user_id].child_count);
}