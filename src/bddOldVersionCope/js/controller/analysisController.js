/**
 * Created by zhangzengwei on 2015/5/22.
 */
app.controller('analysisController', ['$scope', '$routeParams', '$location', 'analysisModel',
    function($scope, $routeParams, $location, analysisModel) {
        pageInit();
        var stateObj = {
            all: false,
            byProduct: false,
            byMonitor: false,
            byAll: false,
            caeMonitor: true,
            alarmType: false
        }

        $scope.contentShowOrHide = function (event) {
            var targetElement = event.target.tagName === 'A' ? $(event.target) : $(event.target).parent();
            if (!targetElement.parent().parent().find('div.in').length) {
                targetElement.parent().parent().find('div.panel-collapse').addClass('in');
                targetElement.find('span[name=down]').removeClass('show-span')
                .parent().find('span[name=up]').addClass('show-span');
                switch (targetElement.attr('name')) {
                    case 'byProduct' : if (!stateObj.byProduct) {
                                            stateObj.byProduct = true;
                                            // drawDataByProductChart();
                                            searchData('product');
                                       }
                                       break;
                    case 'byMonitor' : if (!stateObj.byMonitor) {
                                            stateObj.byMonitor = true;
                                            // drawDataByMonitorChart();
                                            searchData('monitor');
                                       }
                                       break;
                    case 'byAll' :     if (!stateObj.byAll) {
                                            stateObj.byAll = true;
                                            searchData('byall');
                                            getChannels();
                                            $('#analysis select#product_select').unbind('change');
                                            $('#analysis select#product_select').on('change', function(){
                                                getChannels();
                                            });
                                        }
                                        break;
                    case 'all' :
                        if (!stateObj.all) {
                            stateObj.all = true;
                            searchData('all');
                        }
                        break;
                    case 'alarmType' :
                        if (!stateObj.alarmType) {
                            stateObj.alarmType = true;
                            searchData('alarm');
                            // getChannelsAlarm();
                            // getMonitorNamesAlarm();
                            // $('#analysis select#product_select_alarm').unbind('change');
                            // $('#analysis select#product_select_alarm').on('change', function(){
                            //     getChannelsAlarm();
                            //     getMonitorNamesAlarm();
                            // });
                        }
                        break;
                    // case 'caeMonitor': if (!stateObj.caeMonitor) {
                    //                         stateObj.caeMonitor = true;
                    //                         searchData('caemonitor');
                    //                    }
                    //                    break;
                }
            } else {
                targetElement.parent().parent().find('div.panel-collapse').removeClass('in');
                targetElement.find('span[name=up]').removeClass('show-span')
                .parent().find('span[name=down]').addClass('show-span');
            }
        };
        $scope.searchData = function (type) {
            if (type === 'all') {
                var params = {
                    type: 'entire',
                    startTime: $('#search_begin_time_all').val(),
                    endTime: $('#search_end_time_all').val()
                }
                loadDataAll(params);
            } else if (type === 'product') {
                var params = {
                    type: 'product',
                    startTime: $('#search_begin_time_product').val(),
                    endTime: $('#search_end_time_product').val()
                }
                loadDataProduct(params);
            } else if (type === 'monitor') {
                var params = {
                    type: 'monitor',
                    startTime: $('#search_begin_time_monitor').val(),
                    endTime: $('#search_end_time_monitor').val()
                }
                loadDataMonitor(params);
            } else if (type === 'byall') {
                var optionV = $('#analysis select#monitor_level_select').val() ? 'monitorLevel' : 
                    ($('#analysis select#monitor_type_select').val() ? 'monitorType' : 
                    ($('#analysis select#channel_select').val() ? 'channel' : 'product'));
                var params = {
                    type: 'allkinds',
                    productId: $('#analysis select#product_select').val(),
                    channel: $('#analysis select#channel_select').val() ? $('#analysis select#channel_select').find('option:selected').text() : '',
                    monitorType: $('#analysis select#monitor_type_select').val(),
                    monitorLevel: $('#analysis select#monitor_level_select').val(),
                    startTime: $('#search_begin_time_byall').val(),
                    endTime: $('#search_end_time_byall').val(),
                    option: optionV
                };
                loadDataByAll(params);
            } else if (type === 'alarm') {
                var params = {
                    type: 'reasonAnalysis',
                    productId: $('#analysis select#product_select_alarm').val()
                    // channel: $('#analysis select#channel_select_alarm').val()
                    // ? $('#analysis select#channel_select_alarm').find('option:selected').text()
                    // : '',
                    // monitorNameId: $('#analysis select#monitor_type_select_alarm').val(),
                    // startTime: $('#search_begin_time_alarm').val(),
                    // endTime: $('#search_end_time_alarm').val()
                };
                loadDataAlarm(params);
            }
        };
        $scope.toAlarmPage = function (productId, monitorTypeId) {
            productId && monitorTypeId && $location.path('/alarm/' + productId + '/' + monitorTypeId);
        }

        function pageInit() {
            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();
            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=analysis]').addClass('current-li');
            $('input[name=timeBegin]').datetimepicker();
            $('input[name=timeEnd]').datetimepicker();
            $scope.analysisModel = new analysisModel();
            // var params = {
            //     type: 'entire',
            //     startTime: $('#search_begin_time_all').val(),
            //     endTime: $('#search_end_time_all').val()
            // }
            // loadDataAll(params);
            var params = {};
            loadDataCaeMonitor();
        }

        function searchData (type) {
            if (type === 'all') {
                var params = {
                    type: 'entire',
                    startTime: $('#search_begin_time_all').val(),
                    endTime: $('#search_end_time_all').val()
                }
                loadDataAll(params);
            } else if (type === 'product') {
                var params = {
                    type: 'product',
                    startTime: $('#search_begin_time_product').val(),
                    endTime: $('#search_end_time_product').val()
                }
                loadDataProduct(params);
            } else if (type === 'monitor') {
                var params = {
                    type: 'monitor',
                    startTime: $('#search_begin_time_monitor').val(),
                    endTime: $('#search_end_time_monitor').val()
                }
                loadDataMonitor(params);
            } else if (type === 'byall') {
                var optionV = $('#analysis select#monitor_level_select').val() ? 'monitorLevel' : 
                    ($('#analysis select#monitor_type_select').val() ? 'monitorType' : 
                    ($('#analysis select#channel_select').val() ? 'channel' : 'product'));
                var params = {
                    type: 'allkinds',
                    productId: $('#analysis select#product_select').val(),
                    channel: $('#analysis select#channel_select').val() ? $('#analysis select#channel_select').find('option:selected').text() : '',
                    monitorTypeId: $('#analysis select#monitor_type_select').val(),
                    monitorLevel: $('#analysis select#monitor_level_select').val(),
                    startTime: $('#search_begin_time_byall').val(),
                    endTime: $('#search_end_time_byall').val(),
                    option: optionV
                }
                loadDataByAll(params);
            } else if (type === 'caemonitor') {
                var params = {};
                loadDataCaeMonitor();
            } else if (type === 'alarm') {
                var params = {
                    type: 'reasonAnalysis',
                    productId: $('#analysis select#product_select_alarm').val()
                    // channel: $('#analysis select#channel_select_alarm').val()
                    // ? $('#analysis select#channel_select_alarm').find('option:selected').text()
                    // : '',
                    // monitorNameId: $('#analysis select#monitor_type_select_alarm').val(),
                    // startTime: $('#search_begin_time_alarm').val(),
                    // endTime: $('#search_end_time_alarm').val()
                };
                loadDataAlarm(params);
            }
        }

        function loadDataAll (params) {
            $scope.analysisModel.loadData(params, function (result) {
                if (result.success) {
                    var xAxisData = result.data.xAxis;
                    var seriesData = result.data.data;
                    drawDataAllChart(xAxisData, seriesData);
                }
            });
        }
        function loadDataProduct (params) {
            $scope.analysisModel.loadData(params, function (result) {
                if (result.success) {
                    var xAxisData = result.data.xAxis;
                    var seriesData = result.data.data;
                    drawDataByProductChart(xAxisData, seriesData);
                }
            });
        }
        function loadDataMonitor (params) {
            $scope.analysisModel.loadData(params, function (result) {
                if (result.success) {
                    var xAxisData = result.data.xAxis;
                    var seriesData = result.data.data;
                    drawDataByMonitorChart(xAxisData, seriesData);
                }
            });
        }
        function loadDataByAll (params) {
            $scope.analysisModel.loadData(params, function (result) {
                if (result.success) {
                    var xAxisData = result.data.xAxis;
                    var seriesData = result.data.data;
                    drawDataByAllChart(xAxisData, seriesData);
                }
            });
        }
        function loadDataCaeMonitor (params) {
            $scope.analysisModel.loadCaeMonitorData(params, function (result) {
                if (result.success) {
                    var seriesData = result.data;
                    drawCaeMonitor(seriesData);
                }
            });
        }
        function loadDataAlarm(params) {
            $scope.analysisModel.loadData(params, function (result) {
                if (result.success) {
                    var seriesData = result.data;
                    drawDataAlarmChart(seriesData);
                }
            });
        }

        function drawDataAllChart (xAxis, series) {
            $('#data_all_chart').highcharts({
                chart: {
                    type: 'column'
                },
                title: {
                    text: '整体监控项数目和报警数目统计 '
                },
                subtitle: {
                    // text: 'Source: WorldClimate.com'
                },
                xAxis: {
                    categories: xAxis,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '数量（个）'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} 个</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: series
            });
        }
        function drawDataByProductChart (xAxis, series) {
            $('#data_by_product_chart').highcharts({
                chart: {
                    type: 'bar',
                    height: xAxis.length > 10 ? xAxis.length * 35 : undefined
                },
                title: {
                    text: '各产品线报警数量汇总'
                },
                xAxis: {
                    categories: xAxis,
                    crosshair: true,
                    labels: {
                        step: 1
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '值（个）'
                    },               
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    bar: {
                        pointPadding: 0.8,
                        pointWidth: 15
                    }
                },
                series: series
                // title: {
                //     text: '各产品线报警数量汇总'
                // },
                // xAxis: {
                //     categories: xAxis
                // },
                // series: series
            });         
        }
        function drawDataByMonitorChart (xAxis, series) {
            var curBrowserWidth = $(window).width()*0.85;
            $('#data_by_monitor_chart').highcharts({
                chart: {
                    type: 'bar',
                    height: xAxis.length > 10 ? xAxis.length * 35 : undefined
                },
                title: {
                    text: '各监控项报警数量汇总'
                },
                xAxis: {
                    categories: xAxis,
                    crosshair: true,
                    labels: {
                        step: 1
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '值（个）'
                    },               
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    bar: {
                        pointPadding: 0.8,
                        pointWidth: 15
                    }
                },
                series: series
                // title: {
                //     text: '各监控项报警数量汇总'
                // },
                // xAxis: {
                //     categories: xAxis
                // },
                // chart: {
                //     width: xAxis.length*100 > curBrowserWidth ? xAxis.length*100 : undefined
                // },
                // series: series
            });     
        }
        function drawDataByAllChart (xAxis, series) {
            $('#data_by_all_chart').highcharts({
                chart: {
                    type: 'bar',
                    height: xAxis.length > 10 ? xAxis.length * 35 : undefined
                },
                title: {
                    text: '分产品线分频道分类型分级别报警数量汇总'
                },
                xAxis: {
                    categories: xAxis,
                    crosshair: true,
                    labels: {
                        step: 1
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '值（个）'
                    },               
                    stackLabels: {
                        enabled: true,
                        style: {
                            fontWeight: 'bold',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                        }
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                        stacking: 'normal'
                    },
                    bar: {
                        pointPadding: 0.8,
                        pointWidth: 15
                    }
                },
                series: series
                // title: {
                //     text: '分产品线分频道分类型分级别报警数量汇总'
                // },
                // xAxis: {
                //     categories: xAxis
                // },
                // series: series
            });        
        }
        function drawCaeMonitor(series) {
            $scope.nodes = series;
        }
        function drawDataAlarmChart(series) {
            $('#data_alarm_type_chart').highcharts({
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    height: 600
                },
                colors: [
                    '#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970',
                    '#f28f43', '#77a1e5', '#c42525', '#a6c96a', '#7cb5ec', '#434348',
                    '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f',
                    '#f45b5b', '#91e8e1', '#4572A7', '#AA4643', '#89A54E', '#80699B',
                    '#3D96AE', '#DB843D', '#92A8CD', '#A47D7C', '#B5CA92'
                ],
                title: {
                    text: '报警原因分析'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: 'pie',
                    name: '占比',
                    data: series
                }]
            });
        }

        function getChannels () {
            var params = {
                productId: $('#analysis select#product_select').val()
            };
            $scope.analysisModel.loadChannel(params, function (result) {
                if(result.success) {
                    $scope.monitorChannels = result.data;
                }
            });
        }
        function getChannelsAlarm() {
            var params = {
                productId: $('#analysis select#product_select_alarm').val()
            };
            $scope.analysisModel.loadChannel(params, function (result) {
                if (result.success) {
                    $scope.monitorChannelsAlarm = result.data;
                }
            });
        }
        function getMonitorNamesAlarm() {
            var params = {
                productId: $('#analysis select#product_select_alarm').val()
            };
            $scope.analysisModel.loadMonitorName(params, function (result) {
                if (result.success) {
                    $scope.monitorNamesAlarm = result.data.monitorList;
                }
            });
        }
    }
]);