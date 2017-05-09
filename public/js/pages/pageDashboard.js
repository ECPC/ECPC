var page = {
    ready: function(){
        $("div.status img").on("mouseenter", function() {
            $("div.status-help-container").fadeIn('100', function() {
                // $("div.status-help-container").fadeOut('200');
            });
        });
        $("div.status img").on("mouseleave", function() {
            $("div.status-help-container").fadeOut('100', function() {
                // $("div.status-help-container").fadeOut('200');
            });
        });
        page.loadCharts();
    },
    loadCharts: function(){
        $.ajax({
            type : 'GET',
            url : "/api/user/monthEarningsHistory"})
        .done(function(response){
            var monthEarnings = response;
            var ctx = $("#myChart");
            var ctx2 = $("#myChart2");
            var data = {
                type: 'line',
                data: {
                    labels: ["Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
                    datasets: [{
                        label: 'Historial de puntos',
                        data: monthEarnings.points,
                        backgroundColor: [
                            'rgba(255, 163, 102, 0.2)'
                        ],
                        borderColor: [
                            '#ffa366'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    // scales: {
                    //     yAxes: [{
                    //         ticks: {
                    //             beginAtZero:true
                    //         }
                    //     }]
                    // }
                }
            };
            var data2 = {
                type: 'bar',
                data: {
                    labels: ["Noviembre", "Diciembre", "Enero", "Febrero", "Marzo", "Abril"],
                    datasets: [{
                        label: 'Historial de ganancias',
                        data: monthEarnings.earnings,
                        backgroundColor: [
                            'rgba(133, 201, 203, 0.2)',
                            'rgba(133, 201, 203, 0.2)',
                            'rgba(133, 201, 203, 0.2)',
                            'rgba(133, 201, 203, 0.2)',
                            'rgba(133, 201, 203, 0.2)',
                            'rgba(133, 201, 203, 0.2)'
                        ],
                        borderColor: [
                            'rgba(133, 201, 203, 1)',
                            'rgba(133, 201, 203, 1)',
                            'rgba(133, 201, 203, 1)',
                            'rgba(133, 201, 203, 1)',
                            'rgba(133, 201, 203, 1)',
                            'rgba(133, 201, 203, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            };
            var myChart2 = new Chart(ctx2, data2);
            var myChart = new Chart(ctx, data);
        });
    }
};

$(document).ready(page.ready);