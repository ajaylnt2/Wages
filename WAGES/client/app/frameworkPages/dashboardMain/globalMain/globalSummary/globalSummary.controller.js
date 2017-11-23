

class GlobalSummaryController {
    constructor($rootScope, $scope, auth, $timeout, $http) {
        'ngInject';


        this.name = 'globalSummary';
       $(function () {
            (function (H) {
                H.wrap(H.Point.prototype, 'setState', function (proceed) {

                    var stateBefore = this.state;
                    // Run original proceed method
                    proceed.apply(this, [].slice.call(arguments, 1));

                    if (stateBefore !== 'select' && this.state === 'select') {

                        this.update({
                            dataLabels: {
                                color: 'red'
                            }
                        }, false);
                    } else if (stateBefore === 'select' && this.state !== 'select') {

                        this.update({
                            dataLabels: {
                                color: null
                            }
                        }, false);
                    }
                });
            } (Highcharts));


            $http.get("globalData.json")
                .then(function (data) {

                    $scope.googleMapTableData = data.data;
                    console.log("$scope.googleMapTableData",$scope.googleMapTableData)

                    var mapData = Highcharts.geojson(Highcharts.maps['custom/world']);


                    // Correct UK to GB in data
                    $.each(data, function () {
                        if (this.code === 'UK') {
                            this.code = 'GB';
                        }
                    });

                    $('#container').highcharts('Map', {
                        plotOptions: {
                            mapbubble: {
                                allowPointSelect: true,
                                dataLabels: {
                                    enabled: true
                                },
                                marker: {
                                    fillOpacity: 10,
                                    fillColor: "white",
                                    lineColor: "white",
                                    states: {
                                        select: {
                                            fillColor: "red",
                                            lineColor: 'red'
                                        }
                                    }
                                },
                                events: {
                                    click: function () {
                                        var chart = this.chart;
                                        setTimeout(function () {
                                            chart.redraw();
                                        }, 0);
                                    }
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        mapNavigation: {
                            enabled: true,
                            buttonOptions: {
                                verticalAlign: 'bottom'
                            }
                        },
                        series: [{
                            name: 'Countries',
                            mapData: mapData,
                            color: 'black',
                            nullColor: '#0071bb',
                            enableMouseTracking: false
                        }, {

                            type: 'mapbubble',
                            mapData: mapData,
                            name: 'Plant Info',
                            joinBy: ['iso-a2', 'code'],
                            data: data.data,
                            color: "red",
                            minSize: 10,
                            maxSize: '1%'
                            ,
                            tooltip: {
                                pointFormat: '{point.code}:{point.Number Of Plants} Plants'
                            },
                            point: {
                                events: {
                                    click: function () {
                                        $scope.selecteddata = this.code;
                                        var totaldata = $scope.googleMapTableData;
                                        angular.forEach(totaldata, function (value, key) {
                                            if ($scope.selecteddata.toString() == value.code.toString()) {
                                                var table = document.getElementById("myTable");
                                                for (var i = 0; i < table.rows.length; i++) {

                                                    var rowvalue = table.rows[i].innerText;
                                                    var res = rowvalue.substring(0, 2);
                                                    if (res == value.code) {
                                                        table.rows[i].bgColor = "#ddd";
                                                        table.rows[i].style.color = "#53BCE9";

                                                    }
                                                    else {
                                                        table.rows[i].bgColor = "";
                                                        table.rows[i].style.color = "";
                                                    }
                                                }


                                            }

                                        });

                                    }
                                }
                            }
                        }]
                    });

                }, function (response) {
                    console.log('Error response', response);
                });
        });

    }
}

export default GlobalSummaryController;

