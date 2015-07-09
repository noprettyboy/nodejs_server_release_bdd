/**
 * Created by zhujiawei on 2015/5/8.
 */
app.controller('beforeOnlinePvClickController', ['$scope', '$routeParams', '$location', '$compile', 'beforeOnlinePvClickModel',
    function($scope, $routeParams, $location, $compile, beforeOnlinePvClickModel) {

        pageInit();

        $scope.switchProduct = function (event) {
            // console.log(event.target.tagName);
            // if (event.target.tagName === 'LI') {
            //     $location.path('/beforeOnline/pvClick/' + $(event.target).val(), true);
            // } else if (event.target.tagName === 'SPAN') {
            //     $location.path('/beforeOnline/pvClick/' + $(event.target).parent().val(), true);
            // }
            if (event.target.tagName === 'LI') {
                if ($(event.target).val() === 12) {
                    $location.path('/beforeOnline/pvClick/' + $(event.target).val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            } else if (event.target.tagName === 'SPAN') {
                if ($(event.target).parent().val() === 12) {
                    $location.path('/beforeOnline/pvClick/' + $(event.target).parent().val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            }
        };

        $scope.searchData = function () {
            loadCharts ();
        };

        var fmt = 'yyyy-MM-dd';
        $scope.queryTime = {
            currentTime: new Date(),
            specifiedDate: new Date().format(fmt),
            selectDate: [
                {title: '1星期前', selected: true},
                {title: '2星期前', selected: false},
                {title: '3星期前', selected: false},
                {title: '4星期前', selected: false}
            ],
            getWeekAgoDateString: function (numOfWeek) {
                return new Date(this.currentTime.getTime() - numOfWeek * 7 * 24 * 60 * 60 * 1000).format(fmt);
            },
            getQueryTimeString: function () {
                var queryTime = [];
                queryTime.push(this.specifiedDate);
                for (var i = 0, len = this.selectDate.length; i < len; i++) {
                    if (this.selectDate[i].selected) {
                        queryTime.push(this.getWeekAgoDateString(i + 1));
                    }
                }
                return queryTime.sort().uniq().join(',');
            }
        };

        function pageInit(){
            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=display]').addClass('current-li');

            $('#bonline_pv .bonline-pv-left ul li').removeClass('choise-tree-node');
            $('#bonline_pv .bonline-pv-left ul li[value=' + $routeParams.productId + ']').addClass('choise-tree-node');
            $('#bonline_pv .bonline-pv-right ul.sub-alarm-nav-menu li').removeClass('current-li');
            // alert($routeParams.monitorType);
            $('#alarm .alarm-right ul.sub-alarm-nav-menu li[value=' + $routeParams.monitorType + ']').addClass('current-li');

            $scope.beforeOnlinePvClickModel = new beforeOnlinePvClickModel();
            loadCharts ();
        }

        function loadCharts () {
            var params = {
                productId: $routeParams.productId,
                date : $('#before_online_date').val(),
                adType : $('#search_before_online_adtype').val()
            };
            $scope.beforeOnlinePvClickModel.getBeforeOnlinePvClickInfo(params, function(beforeOnlinePvClick){
                if (beforeOnlinePvClick.success) {
                    generateCharts (beforeOnlinePvClick.data);
                }
            });
        }

        function generateCharts (data) {
            $('#result_before_online_pv_click').highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: '线上小流量实时数据'
                },
                xAxis: {
                    categories: data.timeLine,
                    tickInterval: 20
                },
                yAxis: {
                    title: {
                        // text: 'Wind speed (m/s)'
                    }
                },
                tooltip: {
                    valueSuffix: ''
                },
                plotOptions: {
                    spline: {
                        lineWidth: 2,
                        states: {
                            hover: {
                                lineWidth: 3
                            }
                        },
                        marker: {
                            enabled: false
                        }
                    }
                },
                series: data.dataList
            });

            // $('#result_before_online_pv_click').highcharts({
            //     title: {
            //         text: '线上小流量实时数据',
            //         x: -20 //center
            //     },
            //     subtitle: {
            //         text: '',
            //         x: -20
            //     },
            //     xAxis: {
            //         categories: data.timeLine,
            //         labels: {
            //             // step: data.timeLine.length <= 20 ? 1 : Math.ceil(data.timeLine.length / 20)
            //         },
            //         tickInterval: 20
            //     },
            //     yAxis: {
            //         title: {
            //             text: ''
            //         },
            //         plotLines: [{
            //             value: 0,
            //             width: 1,
            //             color: '#808080'
            //         }]
            //     },
            //     tooltip: {
            //         valueSuffix: ''
            //     },
            //     legend: {
            //         layout: 'vertical',
            //         align: 'right',
            //         verticalAlign: 'middle',
            //         borderWidth: 0
            //     },
            //     series : data.dataList
            // });
        }
    }
]);