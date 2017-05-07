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