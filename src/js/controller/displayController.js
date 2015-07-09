app.controller('displayController', ['$scope', '$routeParams', '$location', '$q', '$compile', 'httpTemplate', 'CONFIG',
    function($scope, $routeParams, $location, $q, $compile, httpTemplate, CONFIG) {

        console.log("displayController in");

        /////////////////////////////////////////////
        // page init
        // (TODO: DOM inside angulr controller is totally not good)
        $('div#header ul.nav li').removeClass('current-li');
        $('div#header ul.nav li[name=display]').addClass('current-li');

        $('#monitor .monitor-left ul li').removeClass('choise-tree-node');
        $('#monitor .monitor-left ul li[value=' + $routeParams.productId + ']').addClass('choise-tree-node');

        window.onresize=resizeWidth;
        var curBrowserHeight = $(window).height();
        function resizeWidth() {
            curBrowserHeight = $(window).height();
            $('div#container div.tree-div').css('height', curBrowserHeight-120);
            $('body div.loading-div').css('height', curBrowserHeight);
            $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight/2-150);
        }
        resizeWidth();


        /////////////////////////////////////////////
        // Promise
        var deferred = $q.defer();


        /////////////////////////////////////////////
        // expose method to $scope
        $scope.switchProduct = function(event)
        {
            // if (event.target.tagName === 'LI') {
            //     $location.path('/display/' + $(event.target).val(), true);
            // } else if (event.target.tagName === 'SPAN') {
            //     $location.path('/display/' + $(event.target).parent().val(), true);
            // }
            alert(1);
            if (event.target.tagName === 'LI') {
                $location.path('/dashboard/' + $(event.target).val(), true);
            } else if (event.target.tagName === 'SPAN') {
                $location.path('/dashboard/' + $(event.target).parent().val(), true);
            }
        };


        /////////////////////////////////////////////
        // Common Models
        //   -- queryTime
        $scope.queryTime = {
            fmt           : "yyyy-MM-dd",
            fmtOnPicker   : "Y-m-d",
            currentTime   : new Date(),
            specifiedDate : new Date(),
            selectDate: [
                { title: "1星期前", selected: true},
                { title: "2星期前", selected: false},
                { title: "3星期前", selected: false},
                { title: "4星期前", selected: false}
            ],
            getSpecifiedDateString : function() {
                return this.specifiedDate.format(this.fmt);
            },
            getWeekAgoDateString : function(numOfWeek) {
                return new Date(this.currentTime.getTime() - numOfWeek * 7 * 24 * 60 * 60 * 1000).format(this.fmt);
            },
            getQueryTimeString: function() {
                var queryTime = [];
                queryTime.push(this.getSpecifiedDateString());
                for (var i=0, len=this.selectDate.length; i<len; i++)
                    if (this.selectDate[i].selected)
                        queryTime.push(this.getWeekAgoDateString(i+1));
                return queryTime.sort().uniq().join(',');
            }
        };

        // expose method related with query model
        $scope.weekSelect = function(target, index) {
            $scope.queryTime.selectDate[index].selected = !$scope.queryTime.selectDate[index].selected;
        };

        // wrap jquery ui stuff into angular world
        // (TODO: wrap all of this into angular directive)
        $('#display_specifiedDate').datetimepicker({
            timepicker   : false,
            mask         : true,
            format       : $scope.queryTime.fmtOnPicker,
            value        : $scope.queryTime.getSpecifiedDateString(),
            onSelectDate : function(curTime) {
                $scope.$apply(function() {
                    $scope.queryTime.specifiedDate = curTime;
                });
            }
        });

        /////////////////////////////////////////////
        // KA customized:
        // For KA,  TODO: what if productId changed ?
        if ($routeParams.productId == 1) {

            // model srcSelect
            $scope.srcSelect = {
                selected: undefined,
                options: [ ]
            };
            httpTemplate("GET", CONFIG.srcInfo, {
                    productId: $routeParams.productId
                },
                function (res) {
                    var info = res.data.info;
                    info.forEach(function (item) {
                        $scope.srcSelect.options.push({
                            id: item.srcId,
                            label: item.description
                        });
                        if (typeof $scope.srcSelect.selected == 'undefined') {
                            $scope.srcSelect.selected = item.srcId;
                            deferred.resolve();
                        }
                    });
                });

            // model typeSelect
            $scope.typeSelect = {
                selected: "pv",
                options: [
                    { id: 0, label: "pv" },
                    { id: 1, label: "click" }
                ]
            };

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

            // echarts
            // TODO: wrap into angular directive
            //var chart = echarts.init($('#chart_display')[0]);
            var chart = echarts.init(document.getElementById('result_display'));
            window.addEventListener('resize', chart.resize, false);

            // Listen change, Send out req, Display result ...
            var params = {};
            var genParams = function () {
                params = {
                    productId: $routeParams.productId,
                    queryTime: $scope.queryTime.getQueryTimeString(),
                    srcId: $scope.srcSelect.selected,
                    opType: $scope.typeSelect.selected
                };
                return params;
            };
            var display = function () {
                console.log("echart should be display here");
                console.log(params);
                chart.clear();
                chart.showLoading();
                httpTemplate("GET", CONFIG.pvclick, params,
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
                            var ser = { name: data.date,
                                type: "line",
                                data: [] };
                            xAxis.forEach(function (x) {
                                var hasValue = false;
                                var v = data.list;
                                for (var i = 0, len = v.length; i < len; i++) {
                                    if (x == v[i].time) {
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
                            tooltip: { trigger: 'axis' },
                            legend: {
                                data: legend
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    mark: { show: true},
                                    dataView: { show: true, readOnly: false},
                                    magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                                    restore: { show: true},
                                    saveAsImage: { show: true}
                                }
                            },
                            xAxis: [
                                {   type: 'category',
                                    boundaryGap: false,
                                    data: xAxis
                                }
                            ],
                            yAxis: [
                                { type: 'value' }
                            ],
                            series: series
                        });
                    },
                    function (message) {
                        chart.hideLoading();
                    }
                )
            };

            deferred.promise.then(function () {
                $scope.$watch(genParams, display, true);
            });
        }
        else
        {
            // TODO: for other products, do nothing right now ...
            // TODO: re-struct all of them !
            var imgPath   = 'img/expecting.png';
            var expecting = new Image();
            expecting.onload = function() {
                var expectImg = $('<img>', {
                    src: imgPath
                });
                expectImg.appendTo('#result_display');

                var self = this;
                function setImgPos () {
                    var width  = self.width;
                    var height = self.height;

                    var containerSize = {
                        w: $('#result_display').width(),
                        h: $('#result_display').height()
                    }

                    var margin = {x:0, y:0};
                    if (self.width <= containerSize.w)
                        margin.x = (containerSize.w - self.width) / 2;
                    else
                        width = containerSize.w;

                    if (self.height <= containerSize.h)
                        margin.y = (containerSize.y - self.height) / 2;
                    else
                        height = containerSize.h;

                    expectImg.width(width);
                    expectImg.height(height);
                    expectImg.css({
                        marginTop:    margin.y,
                        marginBottom: margin.y,
                        marginLeft:   margin.x,
                        marginRight:  margin.x
                    });
                }
                setImgPos();
                window.addEventListener('resize', setImgPos, false);
            };
            expecting.src = imgPath;
        }
    }
]);
