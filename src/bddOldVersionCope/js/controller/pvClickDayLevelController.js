/**
 * @file
 * Created by zhangzengwei on 2015/6/11.
 */
/* globals app */
app.controller('pvClickDayLevelController', ['$scope', '$routeParams', '$location', '$compile', 'PvClickDayLevelModel',
    function ($scope, $routeParams, $location, $compile, PvClickDayLevelModel) {

        pageInit();

        $scope.switchProduct = function (event) {
            // if (event.target.tagName === 'LI') {
            //     $location.path('pvClick/dayLevel/' + $(event.target).val(), true);
            // } else if (event.target.tagName === 'SPAN') {
            //     $location.path('pvClick/dayLevel/' + $(event.target).parent().val(), true);
            // }
            if (event.target.tagName === 'LI') {
                if ($(event.target).val() === 8) {
                    $location.path('pvClick/dayLevel/' + $(event.target).val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            } else if (event.target.tagName === 'SPAN') {
                if ($(event.target).parent().val() === 8) {
                    $location.path('pvClick/dayLevel/' + $(event.target).parent().val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            }
        };
        $scope.searchData = function () {
            var params = {
                pageIndex: 1,
                pageSize: $('#number_per_page option:selected').val()
            };
            getDayLevelData(params);
        };
        $scope.jumpPage = function (tag) {
            var params = {
                pageSize: $('#number_per_page option:selected').val()
            };
            if (-1 === tag) {
                params.pageIndex =  parseInt($('.current-page-no').attr('pageIndex'), 10) - 1;
            } else if (1 === tag) {
                params.pageIndex = parseInt($('.current-page-no').attr('pageIndex'), 10) + 1;
            }
            getDayLevelData(params);
        };
        $scope.turnPage = function (pageNum) {
            if (pageNum > $scope.dayLevelInfo.totalPage) {
                return false;
            }
            var params = {
                pageIndex: pageNum,
                pageSize: $('#number_per_page option:selected').val()
            };
            getDayLevelData(params);
        };
        $scope.watchLineChart = function (productId, query) {
            $('#line_chart_dialog').modal('show');
            $('#line_chart_dialog #query_save_text').val(query);
            initLineChartDate();
            $('#line_chart_dialog').find('.fade').removeClass('fade');
            getDayLevelQueryData(query);
        };
        $scope.searchQueryData = function () {
            var query = $('#line_chart_dialog #query_save_text').val();
            getDayLevelQueryData(query);
        };
        $('#number_per_page').on('change', function () {
            var params = {
                pageIndex: 1,
                pageSize: $('#number_per_page option:selected').val()
            };
            getDayLevelData(params);
        });

        function pageInit() {
            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=display]').addClass('current-li');

            $('div#header ul.nav li[name=display] div').removeClass('current-div');
            $('div#header ul.nav li[name=display] div[name=dayLevel]').addClass('current-div');

            $('#day_level_pv .day-level-pv-left ul li').removeClass('choise-tree-node');
            $('#day_level_pv .day-level-pv-left ul li[value=' + $routeParams.productId + ']')
            .addClass('choise-tree-node');
            $('#day_level_pv .day-level-pv-right ul.sub-alarm-nav-menu li')
            .removeClass('current-li');

            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div#container div.tree-div').css('height', curBrowserHeight - 120);
                $('div#container .line-chart-dialog .modal-body').css('height', curBrowserHeight - 250);
                $('body div.loading-div').css('height', curBrowserHeight);
                $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight / 2 - 150);

                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $scope.pvClickDayLevel = new PvClickDayLevelModel();
            $scope.dayLevelCondtion = {};
            $scope.dayLevelCondtion.productId = $routeParams.productId;
            $scope.dayLevelCondtion.productName = $('#day_level_pv .day-level-pv-left ul li[value='
                + $routeParams.productId + ']').attr('pn');
            $scope.dayLevelCondtion.dataType = 'pc';
            initDate();
            var params = {
                pageIndex: 1,
                pageSize: $('#number_per_page option:selected').val()
            };
            getDayLevelData(params);
        }

        function searchTimeFlag(n) {
            var newDA = new Date(new Date() - 0 + n * 86400000);
            var month = newDA.getMonth() + 1;
            month = (month < 10) ? ('0' + month) : month;
            var day = (newDA.getDate() < 10) ? ('0' + newDA.getDate()) : newDA.getDate();
            newDA = newDA.getFullYear() + '-' + month  + '-' + day;
            return newDA + '';
        }
        function initDate() {
            $('#date_text').val(searchTimeFlag(-1));
            $('#date_text').datetimepicker({
                lang: 'ch',
                format: 'Y-m-d',
                timepicker: false
            });
        }
        function initLineChartDate() {
            $('#line_chart_date_text').val(searchTimeFlag(-7));
            $('#line_chart_date_text').datetimepicker({
                lang: 'ch',
                format: 'Y-m-d',
                timepicker: false
            });
        }
        function getDayLevelData(paramsObj) {
            var params = $scope.dayLevelCondtion;
            if (paramsObj) {
                params = $.extend(true, params, paramsObj);
            }
            params.date = $('#date_text').val();
            if (params.pv !== '' && params.pv !== undefined && params.pv < 1) {
                $('#common_dialog .modal-body').html('PV值必须大于等于1，请重新输入正确的值！');
                $('#common_dialog').modal('show');
                $('#common_dialog').find('.fade').removeClass('fade');
                return false;
            }
            if (params.date > searchTimeFlag(-1)) {
                $('#common_dialog .modal-body').html('对比日期必须小于当前日期，请重新选择正确的对比日期！');
                $('#common_dialog').modal('show');
                $('#common_dialog').find('.fade').removeClass('fade');
                return false;
            }

            $scope.pvClickDayLevel.loadData(params, function (result) {
                if (result.success) {
                    $scope.dayLevelInfo = result.data;
                    $scope.tableData = result.data.data;
                    $.table({
                        location: 'div#day_level_pv_data',
                        name: 'dayLevelTable',
                        unit: '%',
                        lineHeight: 30,
                        width: 100,
                        align: 'center',
                        style: {
                            align: 'center',
                            caption: 'font-weight: bold; font-size: 15px;'
                        },
                        columns: [
                            {name: 'QUERY', field: 'query', width: 45, type: 'text'},
                            {name: 'PV(↓)', field: 'pv', width: 20, type: 'text'},
                            {name: '百分比(%)', field: 'percent', width: 20, type: 'text'},
                            {
                                name: '操作', field: '', html: '<a class="action-a preview" '
                                + 'ng-click="watchLineChart(columnItem.productId, columnItem.query)">预览</a>',
                                width: 15, type: 'html'
                            }
                        ],
                        dataName: 'tableData',
                        dataCount: $scope.tableData.length,
                        nullDataStr: '无数据！'
                    });
                    $compile('div#day_level_pv_data')($scope);

                    if (result.data.totalPage <= 1) {
                        $('#next_page_task').attr('disabled', 'disabled');
                        $('#pre_page_task').attr('disabled', 'disabled');
                    } else if (result.data.totalPage > 1) {
                        if (result.data.pageIndex === 1) {
                            $('#pre_page_task').attr('disabled', 'disabled');
                            $('#next_page_task').removeAttr('disabled');
                        } else if (result.data.totalPage === result.data.pageIndex) {
                            $('#next_page_task').attr('disabled', 'disabled');
                            $('#pre_page_task').removeAttr('disabled');
                        } else {
                            $('#pre_page_task').removeAttr('disabled');
                            $('#next_page_task').removeAttr('disabled');
                        }
                    }
                }
            });
        }

        function drawChartForDayLevelQuery(xAxis, yAxis) {
            $('#query_line_Chart').highcharts({
                chart: {
                    type: 'line',
                    height: 300
                },
                title: {
                    text: 'QUERY PV 变化图'
                },
                xAxis: {
                    categories: xAxis,
                    labels: {
                        rotation: -50
                    },
                    gridLineColor: '#909090',
                    gridLineWidth: 1
                    // tickInterval: 20
                },
                yAxis: {
                    title: {
                        text: 'PV 值'
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
                series: yAxis
            });
        }
        function getDayLevelQueryData(query) {
            var params = {
                productId: $routeParams.productId,
                productName: $('#day_level_pv .day-level-pv-left ul li[value='
                + $routeParams.productId + ']').attr('pn'),
                dataType: $('#day_level_pv input[name=dataType]:checked').val(),
                query: query,
                date: $('#line_chart_date_text').val()
            };
            if (params.date > searchTimeFlag(0)) {
                $('#common_dialog .modal-body').html('起始日期必须小于等于当前日期，请重新选择正确的起始日期！');
                $('#common_dialog').modal('show');
                $('#common_dialog').find('.fade').removeClass('fade');
                return false;
            }
            $scope.pvClickDayLevel.loadLineChartData(params, function (result) {
                if (result.success) {
                    drawChartForDayLevelQuery(result.data.xAxis, result.data.yAxis);
                }
            });
        }

    }
]);