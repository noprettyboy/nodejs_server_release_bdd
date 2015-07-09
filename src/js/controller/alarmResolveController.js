/**
 * Created by zhangzengwei on 2015/5/11.
 */
 /* globals app */
app.controller('alarmResolveController', ['$scope', '$routeParams', '$location', '$compile', 'AlarmModel',
    function ($scope, $routeParams, $location, $compile, AlarmModel) {
        pageInit();
        
        $scope.showHtml = function (text, index) {
            $("div.dynamic-content span[index="+index+"]").html(text);
        }

        $scope.submitToNext = function (stepId, actionType) {
            var params = {
                id: stepId,
                status: actionType,
                alarmReason: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val() ? $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType] option:selected').text() : '',
                alarmReasonId: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val(),
                handleAdvice: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] .resolve-info-input').val()
            }
            $scope.alarmModel.resolve(params, function (result) {
                if(result.success) {
                    $location.path('/alarm/' + $routeParams.productId, true);
                }
            });
        }

        $scope.closeAlarm = function (stepId, actionType) {
            var params = {
                id: stepId,
                status: actionType,
                alarmReason: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val() ? $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType] option:selected').text() : '',
                alarmReasonId: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val(),
                handleAdvice: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] .resolve-info-input').val()
            }
            $scope.alarmModel.resolve(params, function (result) {
                if(result.success) {
                    $location.path('/alarm/' + $routeParams.productId, true);
                }
            });
        }

        $scope.addInfo = function (stepId, actionType) {
            var params = {
                id: stepId,
                status: actionType,
                alarmReason: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val() ? $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType] option:selected').text() : '',
                alarmReasonId: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] select[name=alarmType]').val(),
                handleAdvice: $('#alarm_resolve div.resolve-time-line ul li[value=' +stepId+ '] .resolve-info-input').val()
            }
            $scope.alarmModel.resolve(params, function (result) {
                if(result.success) {
                    $location.path('/alarm/' + $routeParams.productId, true);
                }
            });
        }

        $scope.setCurVal = function (curAlarmType, stepId) {
            $('#alarm_resolve .resolve-time-line ul li[value=' + stepId + '] select[name=alarmType]').val(curAlarmType);
        }

        $scope.goBackAlarm = function () {
            $location.path('/alarm/' + $routeParams.productId, true);
        }

        function pageInit() {
            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $scope.alarmModel = new AlarmModel();
            loadAlarmDetail();
            loadAlarmResolveInfo();
        }

        function loadAlarmDetail () {
            var params = {};
            params.alarmId = $routeParams.alarmId;
            $scope.alarmModel.getAlarmDetail(params, function (result) {
                if (result.success) {
                    $scope.alarmDetail = result.data;
                    $('div.unique-content span:nth-child(2)').html(result.data.alarm.reason);
                    setTimeout(function () {
                        $('[data-toggle="popover"]').popover(
                            {
                                trigger: 'hover',
                                placement: 'top',
                                html: 'html'
                            }
                        );
                    }, 100);
                }
            });
        }
        function loadAlarmResolveInfo () {
            var params = {};
            params.alarmId = $routeParams.alarmId;
            $scope.alarmModel.getResolveInfo(params, function (result) {
                if (result.success) {
                    $scope.alarmResolveInfo = result.data;
                }
            });
        }
    }
]);