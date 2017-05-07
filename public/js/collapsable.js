
    // var chart_config = {
    //     chart: {
    //         container: "#collapsable-example",

    //         animateOnInit: true,
            
    //         node: {
    //             collapsable: true
    //         },
    //         animation: {
    //             nodeAnimation: "easeOutBounce",
    //             nodeSpeed: 700,
    //             connectorsAnimation: "bounce",
    //             connectorsSpeed: 700
    //         }
    //     },
    //     nodeStructure: {
    //         image: "images/user-icon-dark.png",
    //         children: [
    //             {
    //                 image: "images/user-icon-dark.png",
    //                 collapsed: true,
    //                 children: [
    //                     {
    //                         image: "images/user-icon-dark.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 image: "images/user-icon-dark.png",
    //                 childrenDropLevel: 1,
    //                 children: [
    //                     {
    //                         image: "images/user-icon-dark.png"
    //                     }
    //                 ]
    //             },
    //             {
    //                 pseudo: true,
    //                 children: [
    //                     {
    //                         image: "images/user-icon-dark.png"
    //                     },
    //                     {
    //                         image: "images/user-icon-dark.png"
    //                     }
    //                 ]
    //             }
    //         ]
    //     }
    // };

 // Array approach
var config = {
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
malory = {
    image: "img/user-icon-dark.png"
},

lana = {
    parent: malory,
    image: "img/user-icon-dark.png"
}

figgs = {
    parent: malory,
    image: "img/user-icon-dark.png"
}

sterling = {
    parent: lana,
    childrenDropLevel: 1,
    image: "img/user-icon-dark.png"
},

woodhouse = {
    parent: figgs,
    image: "img/user-icon-dark.png"
},

cheryl = {
    parent: lana,
    image: "img/user-icon-dark.png"
},

pam = {
    parent: figgs,
    image: "img/user-icon-dark.png"
},

chart_config = [config, malory, lana, figgs, sterling, woodhouse, pam, cheryl];

