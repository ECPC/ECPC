$(document).ready(function(){
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
                            'rgba(99, 99, 255, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
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
        });
});