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
        $(document).on('onboarding', page.onboarding);

        page.loadCharts();
        onboardingProgress.serverload();

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
    },
    steps: [
        { attachTo: '#pageTitle bottom', title: 'Bienvenido a tu página principal.', text: 'Aquí podrás obtener un resumen rápido de tu progreso, ver las ganancias que has hecho en el mes y el estado de tu cuenta.'},
        { attachTo: '.onboarding-progreso-mensual bottom', title: 'Tu progreso mensual.', text: 'Esto describe la cantidad de puntos que hayas obtenido este mes por medio de tus compras. Compra artículos en la tienda y recibe puntos!'},
        { attachTo: '.onboarding-estado bottom', title: 'El estado de tu cuenta.', text: 'De esto depende tu membresía, cuida el estado de tu cuenta cumpliendo con el minimo de <strong>100 puntos mensuales</strong>. ¡Si tu estado es malo, perderás la bonificación que hayas generado durante el mes!'},
        { attachTo: '.onboarding-bonificacion bottom', title: 'Tus ganancias.', text: 'Este es el dinero que has hecho durante este mes, inscribe nuevos socios para obtener mayores bonificaciones.'},
        { attachTo: '.onboarding-socios bottom', title: 'Tus socios.', text: 'Cada compra que realice un socio que se encuentre en tu red, te bonificará un porcentaje de lo comprado.'},
        { attachTo: '.onboarding-red right', title: 'Tu red.', text: 'Aquí podrás ver a las personas que pertenecen a tu red. Todos estos son tus socios, y te proporcionarán bonificaciones.'},
        { attachTo: '.onboarding-inscribir right', title: 'Inscribir socio.', text: 'No lo dudes, entre más socios tengas, mucho mayor será tu bonificación. Aquí podrás inscribir a un socio.'},
        { attachTo: '#sidepanel-info right', title: 'Información rápida.', text: 'No importa donde estés en la aplicación, siempre tendrás acceso a un resumen rápido de tu información en esta zona.'},
        { attachTo: '.onboarding-registro right', title: 'Finalizar registro.', text: 'Bien, ahora que ya conoces tu página principal, ¿Por qué no llenamos tu perfil?. ¡Esto te permitirá utilizar la aplicación sin ningún limite!'},
    ],
    onboarding: function(){
        if(!onboardingProgress.progress.dashboard){
            var tour = new Shepherd.Tour({
                defaults: {
                    classes: 'shepherd-theme-dark',
                    scrollTo: true
                }
            });

            page.steps = onboardingBuilder.attachButtons(tour, page.steps);

            page.steps[4].buttons[1].action = function(){
                $('#Menu-Red').collapse('show');
                return tour.next();
            }
            page.steps[7].buttons[1].action = function(){
                $('#Menu-Inicio').collapse('show');
                return tour.next();
            }

            page.steps[0].buttons[0].action = function(){
                onboardingProgress.progress.dashboard = true;
                onboardingProgress.save();
                return tour.hide();
            }
            page.steps[8].buttons[1].action = function(){
                onboardingProgress.progress.dashboard = true;
                onboardingProgress.save();
                return tour.hide();
            }

            onboardingBuilder.attachToTour(tour, page.steps);

            tour.start();
        }
    }
};

$(document).ready(page.ready);