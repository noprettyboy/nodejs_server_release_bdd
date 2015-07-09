/**
 * Created by zhangzengwei on 2015/4/28.
 */
/* globals app */
app.controller('alarmController', ['$scope', '$routeParams', '$location', '$compile', 'AlarmModel',
    function ($scope, $routeParams, $location, $compile, AlarmModel) {
        
        pageInit();

        $scope.refreshSearchAlarmDate = function() {
            $('#search_alarm_begin_time').val("");
            $('#search_alarm_end_time').val("")
        }

        $scope.filterMonitorName = function (monitorItem, monitorLevel, monitorChannel) {
            // console.log(monitorItem.monitorLevel + monitorItem.channel + '->' + monitorLevel + '->' + monitorChannel);
            if (monitorLevel && monitorChannel) {
                if ((parseInt(monitorLevel) === parseInt(monitorItem.monitorLevel)) && (String(monitorChannel) === String(monitorItem.channel))) {
                    return true;
                } else {
                    return false;
                }
            } else if (monitorLevel && !monitorChannel) {
                if (parseInt(monitorLevel) === parseInt(monitorItem.monitorLevel)) {
                    return true;
                } else {
                    return false;
                }
            } else if (!monitorLevel && monitorChannel) {
                if (String(monitorChannel) === String(monitorItem.channel)) {
                    return true;
                } else {
                    return false;
                }
            } else if (!monitorLevel && !monitorChannel) {
                return true;
            }
        }

        $scope.searchAlarm = function () {
            sessionStorage.alarmScope = $('#search_alarm_scope').val();
            sessionStorage.alarmStatus = $('#search_alarm_status').val();
            sessionStorage.alarmMonitorType = $('#search_alarm_monitor_type').val();
            sessionStorage.alarmMonitorLevel = $('#search_alarm_level').val();
            var params = {
                pageIndex: 1
            };
            loadAlarm(params);
        }

        // $scope.searchAlarmByMonitorType = function (monitorTypeId) {
            // $location.path('/alarm/' + $routeParams.productId + '/' + monitorTypeId, true);
            // $("#alarm .alarm-right ul.sub-alarm-nav-menu li").removeClass("current-li");
            // $("#alarm .alarm-right ul.sub-alarm-nav-menu li[value="+monitorTypeId+"]").addClass("current-li");
            // var params = {
            //     pageIndex: 1
            // };
            // loadAlarm(params);
        // }

        $scope.disabledATab = function (url) {
            if (url == '') {
                $('.common-alert-dialog .modal-body').text('对不起，该项报警没有预览页面！');
                $('.common-alert-dialog').modal('show');
                // $.dialog({
                //     title: '提示信息', //Default Value 'Demo'
                //     name: 'alarmViewFail',  //Must
                //     unit: 'px', //px or % Default Value 'px'
                //     width: 600, //Default Value '560'
                //     height: 50, //Default Value '200'
                //     lineHeight:40,
                //     content: $compile('<div>对不起，该项报警没有预览页面！</div>')($scope),
                //     classed: 'zzw', //Default Value '
                //     buttons: [
                //         {
                //             text: '确定',
                //             id:   'btnCancel',
                //             classed: 'btn btn-warning',
                //             click: function() {
                //                 $.dialog('hide', 'alarmViewFail');
                //             }
                //         }
                //     ]
                // });
                return false;
            } else {
                window.open(url);
            }
        }

        $scope.pushNextOne = function (alarmId) {
            var params = {};
            params.alarmId = alarmId;
            $scope.alarmModel.pushNextOne(params, function(result) {
                if(result.success){
                    $('.common-alert-dialog .modal-body').text('催办下一个处理人员成功！');
                    $('.common-alert-dialog').modal('show');
                }
            });
        }

        $scope.getStatusClass = function (status) {
            if (status === 0) {
                return 'uncompleted';
            } else if (status === 1) {
                return 'running';
            } else if (status === 2) {
                return 'complete';
            }
        }

        $scope.jumpAlarmPage = function(tag){
            var params = {};
            if("pre_page" == tag){
                params.pageIndex =  parseInt($(".current-page-no").attr("pageIndex")) -1;
            }else if("next_page" == tag){
                params.pageIndex = parseInt($(".current-page-no").attr("pageIndex")) +1
            }
            loadAlarm(params);
        }

        $scope.turnAlarmPage = function(target){
            var params = {};
            params.pageIndex = target;
            if( parseInt(params.pageIndex) > parseInt($('.total-alarm-page-count').attr("totalCount"))){
                $('.common-alert-dialog .modal-body').text("不能超过总页数！");
                $('.common-alert-dialog').modal('show');
            }else {
                loadAlarm(params);
            }
        }

        $scope.resolveAlarm = function (alarmId) {
            $location.path('/alarm/resolve/' + $routeParams.productId + '/' + alarmId, true);
        }

        $scope.switchProduct = function (event) {
            if (event.target.tagName === 'LI') {
                $location.path('/alarm/' + $(event.target).val(), true);
            } else if (event.target.tagName === 'SPAN') {
                $location.path('/alarm/' + $(event.target).parent().val(), true);
            } 
        }

        $scope.exportAlarmList = function () {
            var params = getReqAlarmDataParams();
            delete params.pageSize;
            exportAlarmList(params);
        }

        $scope.reloadAlarmList = function () {
            var params = {
                pageIndex: 1
            };
            loadAlarm(params);
        }

        $scope.batchDeal = function () {
            console.log('in alarm batch deal!');
            var batchDealArr = $('#alarm #alarm_table_div input.batch-deal:checked');
            if (!batchDealArr.length) {
                $('.common-alert-dialog .modal-body').text('请至少选择一项！');
                $('.common-alert-dialog').modal('show');
                return false;
            }
            var alarmId = '';
            $.each(batchDealArr, function (index, item) {
                alarmId += $(item).attr('value') + ',';
            });
            alarmId = alarmId.substr(0, alarmId.length - 1);
            sessionStorage.alarmIdStr = alarmId;
            var alarmIdArr = alarmId.split(',');
            $location.path('/alarm/batchResolve/' + $routeParams.productId + '/' + alarmIdArr[0], true);
        };

        function pageInit() {
            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=alarm]').addClass('current-li');

            $('#alarm .alarm-left ul li').removeClass('choise-tree-node');
            $('#alarm .alarm-left ul li[value=' + $routeParams.productId + ']').addClass('choise-tree-node');
            $('#alarm .alarm-right ul.sub-alarm-nav-menu li').removeClass('current-li');
            // alert($routeParams.monitorType);
            $('#alarm .alarm-right ul.sub-alarm-nav-menu li[value=' + $routeParams.monitorType + ']').addClass('current-li');

            window.onresize=resizeWidth;
            // var curBrowserWidth = $(window).width();
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                // curBrowserWidth = $(window).width();
                curBrowserHeight = $(window).height();
                //console.log(curBrowserHeight);
                $('div#container div.tree-div').css('height', curBrowserHeight-120);
                $('body div.loading-div').css('height', curBrowserHeight);
                $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight/2-150);

                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $('#search_alarm_begin_time').datetimepicker();
            $('#search_alarm_end_time').datetimepicker();

            // bind the default data
            // console.log(sessionStorage.alarmMemory);
            if (sessionStorage.alarmScope !== undefined
                && sessionStorage.alarmStatus !== undefined
                && sessionStorage.alarmMonitorType !== undefined
                && sessionStorage.alarmMonitorLevel !== undefined) {
                $('#search_alarm_scope').val(sessionStorage.alarmScope);
                $('#search_alarm_status').val(sessionStorage.alarmStatus);
                $('#search_alarm_monitor_type').val(sessionStorage.alarmMonitorType);
                $('#search_alarm_level').val(sessionStorage.alarmMonitorLevel);
            }

            $scope.alarmModel = new AlarmModel();
            var params = {
                pageIndex: 1
            };
            loadAlarm(params);
            loadChannel();
            loadMonitorName();
            $scope.alarm = {
                pageSize: 30
            };
        }
        
        function loadChannel () {
            var params = {};
            params.productId = $routeParams.productId;
            $scope.alarmModel.loadChannel(params, function (result) {
                if(result.success) {
                    $scope.monitorChannels = result.data;
                }
            });
        }

        function loadMonitorName () {
            var params = {
                productId: $routeParams.productId
            };
            $scope.alarmModel.loadMonitorNames(params, function (result) {
                if(result.success) {
                    $scope.monitorNames = result.data;
                }
            });
        }

        function loadAlarm (params) {
            var basicParams = getReqAlarmDataParams();
            var allParams = $.extend(true, params, basicParams);
            loadAlarmData(allParams);
        }

        function getReqAlarmDataParams () {
            var params = {};
            params.productId = $routeParams.productId;
            params.monitorTypeId = $('#search_alarm_monitor_type').val();

            var scopeTag = $('#search_alarm_scope').val();

            if (scopeTag === '0') {
                params.username = $('#userName').text();
            } else {
                params.username = "";
            }
            params.alarmId = $('#search_alarm_id').val();
            params.monitorLevel = $('#search_alarm_level').val();
            params.channel = $('#search_alarm_channel option:selected').attr("name");
            params.monitorName = $('#search_alarm_name').val();
            params.status = $('#search_alarm_status').val();
            params.beginTime = $('#search_alarm_begin_time').val();
            params.endTime = $('#search_alarm_end_time').val();

            params.pageSize = $("#number_per_page option:selected").val();

            return params;
        }

        function loadAlarmData (params) {
            $scope.alarmModel.loadAlarmList(params, function (result) {
                if(result.success){
                    $scope.loadAlarmData = result.data;
                    $scope.tableData = result.data.table.rows;
                    $.table({
                        location: 'div#alarm_table_div',
                        name: 'displayTable',
                        unit: "%",
                        lineHeight: 30,
                        width: 100,
                        align: 'center',
                        style: {
                            align: 'center',
                            caption: 'font-weight: bold; font-size: 15px;'
                        },
                        columns: [
                            {name: '', field: '', width: 2, type: 'ck'},
                            {name: '报警ID', field: 'id', width: 4, type: 'text'},
                            {name: 'QUERY', field: 'query', width: 9, type: 'text'},
                            {name: '频道', field: 'channel', width: 6, type: 'text'},
                            {name: '监控项名称', field: 'monitorName', width: 8, type: 'text'},
                            {name: '监控子类型', field: 'subMonitorType', width: 6, type: 'text'},
                            {name: '监控级别', field: 'monitorLevel', type: 'html',
                                html: '<span>P{{columnItem.monitorLevel}}</span>', width: 3},
                            {name: '报警时间', field: 'date', width: 8, type: 'text'},
                            {name: '报警原因', field: 'reason', width: 14, type: 'html', tip: true,
                                html: '<div style="width:85%;height:30px;overflow:hidden;'
                                + 'display:inline-block;vertical-align:top;cursor:pointer;">'
                                + '{{columnItem.reason}}</div><div style="display:inline-block;'
                                + 'width:15%;line-height:20px;">...</div>'},
                            {name: '报警重复次数', field: 'alarmCount', width: 6, type: 'text'},
                            {name: '健康度影响', field: 'healthEffect', width: 4, type: 'html', pop: true,
                                html: '健康度详情:<br>{{columnItem.healthEffectInfo}}'},
                            {name: '状态', field: 'status', width: 6, type: 'html',
                                html: '<span ng-class ="getStatusClass(columnItem.status)">'
                                + '{{columnItem.status == 0 ? "未处理" : '
                                + '(columnItem.status == 1 ? "处理中" : "处理完成")}}</span>'},
                            // { name: '动态', field: 'loadAlarmData.table.heads', width: 3, type: 'dynamic' },
                            {name: '负责人', field: 'owner', width: 14, type: 'text'},
                            {name: '操作', field: '', width: 10, type: 'html',
                                html: '<a class="action-a preview" ng-click="disabledATab(columnItem.url)">预览</a>'
                                + '<a  class="action-a alarmResolve" ng-click="resolveAlarm(columnItem.id)">处理</a>'
                                + '<a  class="action-a push-next-one" ng-click="pushNextOne(columnItem.id)">催办</a>'}
                        ],
                        dataName: 'tableData',
                        dataCount: $scope.tableData.length,
                        nullDataStr: '无数据！'
                    });
                    $compile("div#alarm_table_div")($scope);
                    setTimeout(function () {
                        $('table[name=displayTable] tbody tr td[value=true]').on('mouseover', function () {
                            for (var i = 0; i < 1000000000; i++) {}
                            $(this).find('div.myTip div').css('display', 'block');
                        });
                        $('table[name=displayTable] tbody tr td[value=true]').on('mouseout', function () {
                            $(this).find('div.myTip div').css('display', 'none');
                        });

                        $('[data-toggle="popover"]').popover(
                            {
                                trigger: 'hover',
                                placement: 'top',
                                html: 'html'
                            }
                        );
                    }, 100);

                    if(result.data.totalPage <= 1){
                        $("#next_page_task").attr("disabled", "disabled");
                        $("#pre_page_task").attr("disabled", "disabled");
                    }else if(result.data.totalPage > 1){
                        if(result.data.pageIndex == 1){
                            $("#pre_page_task").attr("disabled", "disabled");
                            $("#next_page_task").removeAttr("disabled");
                        }else if (result.data.totalPage == result.data.pageIndex) {
                            $("#next_page_task").attr("disabled", "disabled");
                            $("#pre_page_task").removeAttr("disabled");
                        }else {
                            $("#pre_page_task").removeAttr("disabled");
                            $("#next_page_task").removeAttr("disabled");
                        }
                    }
                }
            });
        }

        function exportAlarmList (params) {
            $scope.alarm = {};
            $scope.alarm.alarmExportUrl = '../../../api/alarm/download?';
            for (var item in params) {
                if (params[item]) {
                    $scope.alarm.alarmExportUrl += item + '=' + params[item] + '&';
                }
            }
            $scope.alarm.alarmExportUrl = $scope.alarm.alarmExportUrl.substr(0, $scope.alarm.alarmExportUrl.length-1);
        }
    }
]);