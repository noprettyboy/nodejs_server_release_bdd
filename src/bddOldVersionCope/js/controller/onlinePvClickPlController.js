/**
 * @file: onlinePvClickPlController
 * @author: wenghanyi
 */

// fuck codestyle !
var app = app;
var echarts = echarts;

app.controller('onlinePvClickPlController', ['$scope', '$routeParams', '$location', 'httpTemplate', 'CONFIG',
    function ($scope, $routeParams, $location, httpTemplate, CONFIG) {

        // ---
        // NOTE:  customized for KA-PL, productId = 1
        // ---
        // var productId = $routeParams.productId;
        var productId = 1;


        // ///////////////////////////////////////////
        // page init
        // (TODO: DOM inside angulr controller is totally not good)
        $('div#header ul.nav li').removeClass('current-li');
        $('div#header ul.nav li[name=dashboard]').addClass('current-li');

        $('#monitor .monitor-left ul li').removeClass('choise-tree-node');
        $('#monitor .monitor-left ul li[value=' + productId + ']').addClass('choise-tree-node');

        window.onresize = resizeWidth;
        var curBrowserHeight = $(window).height();
        function resizeWidth() {
            curBrowserHeight = $(window).height();
            $('div#container div.tree-div').css('height', curBrowserHeight - 120);
            $('body div.loading-div').css('height', curBrowserHeight);
            $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight / 2 - 150);
        }
        resizeWidth();


        // ///////////////////////////////////////////
        // echarts
        // TODO: wrap into angular directive
        var chart = echarts.init(document.getElementById('result_display'));
        window.addEventListener('resize', chart.resize, false);


        // ///////////////////////////////////////////
        // expose method to $scope
        $scope.switchProduct = function (event)
        {
            // if (event.target.tagName === 'LI') {
            //     $location.path('/dashboard/' + $(event.target).val(), true);
            // } else if (event.target.tagName === 'SPAN') {
            //     $location.path('/dashboard/' + $(event.target).parent().val(), true);
            // }
            if (event.target.tagName === 'LI') {
                if ($(event.target).val() === 1) {
                    $location.path('/online/pvClick/' + $(event.target).val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            } else if (event.target.tagName === 'SPAN') {
                if ($(event.target).parent().val() === 1) {
                    $location.path('/online/pvClick/' + $(event.target).parent().val(), true);
                } else {
                    $location.path('/dashboard/' + $(event.target).val(), true);
                }
            }
        };


        // ///////////////////////////////////////////
        // Common Models
        //   -- queryTime
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

        // expose method related with query model
        $scope.weekSelect = function (target, index) {
            $scope.queryTime.selectDate[index].selected = !$scope.queryTime.selectDate[index].selected;
        };


        // ///////////////////////////////////////////
        // model srcSelect
        $scope.srcSelect = {
            selected: undefined,
            options: [ ]
        };


        // ///////////////////////////////////////////
        // model typeSelect
        $scope.typeSelect = {
            selected: 'pv',
            options: [
                {id: 0, label: 'pv'},
                {id: 1, label: 'click'}
            ]
        };

        // ///////////////////////////////////////////
        // Listen change, Send out req, Display result ...
        var params = {};
        var genParams = function () {
            params = {
                productId: productId,
                queryTime: $scope.queryTime.getQueryTimeString(),
                srcId: $scope.srcSelect.selected,
                opType: $scope.typeSelect.selected
            };
            return params;
        };
        var display = function () {
            console.log(params);
            chart.clear();
            chart.showLoading();
            httpTemplate('GET', CONFIG.pvclick, params,
                function (res) {
                    var dataList = res.data.dataList;
                    var legend = [];
                    var xAxis = [];
                    var series = [];
                    // Get all xAxis first
                    dataList.forEach(function (data) {
                        var valueList = data.list;
                        valueList.forEach(function (val) {
                            xAxis.push(val.time);
                        });
                    });
                    xAxis = xAxis.sort().uniq();
                    // Fill legend & series now:
                    dataList.forEach(function (data) {
                        legend.push(data.date);
                        var ser = {
                            name: data.date,
                            type: 'line',
                            data: []
                        };
                        xAxis.forEach(function (x) {
                            var hasValue = false;
                            var v = data.list;
                            for (var i = 0, len = v.length; i < len; i++) {
                                if (x === v[i].time) {
                                    ser.data.push(v[i].count);
                                    hasValue = true;
                                    break;
                                }
                            }
                            if (!hasValue) {
                                ser.data.push(0);
                            }
                        });
                        series.push(ser);
                    });

                    chart.hideLoading();
                    chart.setOption({
                        tooltip: {trigger: 'axis'},
                        legend: {
                            data: legend
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {show: true},
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        xAxis: [
                            {type: 'category',
                             boundaryGap: false,
                             data: xAxis}
                        ],
                        yAxis: [
                            {type: 'value'}
                        ],
                        series: series
                    });
                },
                function (message) {
                    chart.hideLoading();
                }
            );
        };

        // ///////////////////////////////////////////
        // fill srcSelect, and then watch params change ...
        httpTemplate('GET', CONFIG.srcInfo, {
                productId: productId
            },
            function (res) {
                var info = res.data.info;
                info.forEach(function (item) {
                    $scope.srcSelect.options.push({
                        id: item.srcId,
                        label: item.description
                    });
                    if (typeof $scope.srcSelect.selected === 'undefined') {
                        $scope.srcSelect.selected = item.srcId;
                    }
                });
            }
        )
        .then(function () {
            $scope.$watch(genParams, display, true);
        });


        /*
        var customizeKA = function (text, modelName, selOp) {
            var div = $('<div>', {
                css: {
                    display: 'inline-block',
                    marginLeft: '10px',
                    height: '30px'
                }
            });
            var sp = $('<span>', {
                text: text
            });
            sp.addClass('search-title');
            sp.appendTo(div);
            var sel = $('<select>', {
                'ng-model': modelName + '.selected',
                'ng-options': selOp //'op.id as op.label for op in ' + modelName + '.options'
            });
            sel.addClass('select-form');
            sel.appendTo(div);

            div.appendTo($('#display_search_header'));
        }

        // DOM added ...
        customizeKA('选择展现位:', 'srcSelect', 'op.id as op.label for op in srcSelect.options');
        customizeKA('选择类型:', 'typeSelect', 'op.label as op.label for op in typeSelect.options');
        $compile('#display_search_header')($scope);
        */

    }
]);
