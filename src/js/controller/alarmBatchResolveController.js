/**
 * @file
 * Created by zhangzengwei on 2015/7/1.
 */
 /* globals app */
app.controller('alarmBatchResolveController', ['$scope', '$routeParams', '$location', '$compile', 'AlarmModel',
    function ($scope, $routeParams, $location, $compile, AlarmModel) {
        pageInit();

        function pageInit() {
            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $scope.alarmModel = new AlarmModel();
            loadAlarmBatchResolveInfo();
        }

        function loadAlarmBatchResolveInfo() {
            var params = {};
            params.alarmId = $routeParams.alarmId;
            $scope.alarmModel.getBatchResolveInfo(params, function (result) {
                if (result.success) {
                    $scope.alarmBatchResolveInfo = result.data;
                }
            });
        }

        $scope.closeAlarm = function () {
            var params = {
                alarmIds: sessionStorage.alarmIdStr,
                reason: $('#alarm_batch_resolve div.batch-resolve-time-line ul li select[name=alarmType]').val() ?
                    $('#alarm_batch_resolve div.batch-resolve-time-line ul li select[name=alarmType] option:selected')
                    .text() : '',
                reasonId: $('#alarm_batch_resolve div.batch-resolve-time-line ul li select[name=alarmType]').val(),
                advice: $('#alarm_batch_resolve div.batch-resolve-time-line ul li .resolve-info-input').val()
            };
            $scope.alarmModel.resolveBatch(params, function (result) {
                if (result.success) {
                    sessionStorage.alarmIdStr = '';
                    $location.path('/alarm/' + $routeParams.productId, true);
                }
            });
        };

        $scope.goBackAlarm = function () {
            sessionStorage.alarmIdStr = '';
            $location.path('/alarm/' + $routeParams.productId, true);
        };
    }
]);