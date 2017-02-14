app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$filter', '$location', dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, $http, $filter, $location) {
    $rootScope.$broadcast('SELECTED_TAB', 'dashboard');
    $scope.getFailedSummary = function() {
        $http({
            url: 'api/wf-api/failedsummary',
            method: 'GET'
        }).success(function(data, status, header, config) {
            $scope.summaryData = data.data
            // $scope.initFailedChart(data.data)
        })
    }
    $scope.getFailedSummary()

    $scope.getWeekSummary = function() {
        $http({
            url: 'api/wf-api/weeksummary',
            method: 'GET'
        }).success(function(data, status, header, config) {
            var weekData = data.data
            $scope.labels = getSortedDates(weekData)
            $scope.weekData = []
            $scope.legends = []
            _.each(weekData, function(item) {
               var temp = {
                   "name": item.status,
                   "stack": item.type,
                   "color" : $scope.getColor(item.status),
                   "data": getData(item.dates, item.data, item)
               }
               $scope.weekData.push($scope.enrichLegend(temp,item.status))
            })
            $scope.initWeekChart()
        })
    }
    $scope.getWeekSummary()

    $scope.enrichLegend = function(item,status){
      statusObj = {"status":status}
      var inLegend = _.find($scope.legends,statusObj)
      if (!inLegend){
        item.showInLegend = true
        $scope.legends.push(statusObj)
      }else{
        item.showInLegend = false
      }
      return item
    }

    function getSortedDates(data) {
        var dates = _.map(data, 'dates');
        dates = dates.reduce(function(a, b) {
            return a.concat(b);
        });
        dates = _.uniqBy(dates, function(e) {
            return e;
        });
        dates = _.sortBy(dates);
        return dates
    }

    $scope.colors = [{
        "status": "FAIL",
        "color": "red"
    }, {
        "status": "DONE",
        "color": "#008000"
    }, {
        "status": "NEW",
        "color": "#0000FF"
    }]

    function getData(dates, data, item) {
        var newData = []
        _.each($scope.labels, function(label, index) {
            if (_.indexOf(dates, label) == -1) {
                newData.push({
                    y: 0,
                    "type": item.type
                })
            } else {
                var val = data[_.indexOf(dates, label)]
                newData.push({
                    y: val,
                    "type": item.type,
                    "status": item.status,
                    // color: $scope.getColor(item.status)
                })
            }
        })
        return newData
    }

    $scope.getColor = function(status) {
        var temp = _.find($scope.colors, {
            "status": status
        })
        return temp.color
    }

    $scope.redirectToTrades = function(type, status,date) {
        window.location.href = "/#/trades?type=" + type + "&status=" + status + "&date="+date
    }

    $scope.initWeekChart = function() {
        Highcharts.chart('container-1', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Activity'
            },

            xAxis: {
                categories: $scope.labels,
                title: {
                    text: 'Process Date',
                    y: 10
                }
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of Trades'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    },
                    formatter: function() {
                        return this.stack
                    }
                }
            },

            tooltip: {
                formatter: function() {
                    return '<b>Message type : ' + this.point.type + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        formatter:function(){
                            if(this.y > 0)
                                return this.y;
                        },
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                $scope.redirectToTrades(this.type, this.status,this.category)
                            }
                        }
                    }
                }
            },
            legend: {
                "enabled": true
            },
            series: $scope.weekData
        });
        setTimeout(function() {
            $("#container-1").highcharts().reflow();
        }, 100)
    }
    // $scope.initFailedChart = function(failedData) {
    //     labels = _.map(failedData, 'type')
    //     var seriesData = []
    //     var tempData = {
    //         name: 'Fail',
    //         data: []
    //     }
    //     _.each(failedData, function(item) {
    //         tempData.data.push({
    //             y: item.count,
    //             "type": item.type
    //         })
    //     })
    //     seriesData.push(tempData)
    //
    //     Highcharts.chart('container', {
    //         chart: {
    //             type: 'column',
    //             backgroundColor: 'transparent'
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         title: {
    //             text: 'Fail'
    //         },
    //
    //         xAxis: {
    //             categories: labels,
    //             title: {
    //                 text: 'Message types',
    //                 y: 10
    //             }
    //         },
    //
    //         yAxis: {
    //             allowDecimals: false,
    //             min: 0,
    //             title: {
    //                 text: 'Number of trades'
    //             }
    //         },
    //
    //         tooltip: {
    //             formatter: function() {
    //                 return '<b>' + this.x + '</b><br/>' +
    //                     this.series.name + ': ' + this.y + '<br/>'
    //             }
    //         },
    //
    //         plotOptions: {
    //             column: {
    //                 stacking: 'normal'
    //             },
    //             series: {
    //                 cursor: 'pointer',
    //                 point: {
    //                     events: {
    //                         click: function() {
    //                             $scope.redirectToTrades(this.type, "FAIL")
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         legend: {
    //             "enabled": false
    //         },
    //         series: seriesData
    //     });
    //     setTimeout(function() {
    //         $("#container").highcharts().reflow();
    //     }, 500)
    // }
}
