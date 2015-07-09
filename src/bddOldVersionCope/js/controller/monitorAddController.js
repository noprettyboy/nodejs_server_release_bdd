/**
 * Created by zhangzengwei on 2015/5/8.
 */
app.controller('monitorAddController', ['$scope', '$routeParams', '$location', '$compile', 'monitorModel',
    function($scope, $routeParams, $location, $compile, monitorModel) {
        pageInit();


        $scope.goBackMonitor = function () {
            $location.path('/monitor/' + $routeParams.productId, true);
        }

        $scope.saveMonitorItem = function () {
            addMonitorItem();
        }


        function pageInit() {
            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();
            $scope.monitorModel = new monitorModel();
            loadChannel();
            var params = {
                monitorTypeId: 1
            };
            loadSubMonitor(params);   
        }

        function loadChannel () {
            var params = {};
            params.productId = $routeParams.productId;
            $scope.monitorModel.loadChannel(params, function (result) {
                if(result.success) {
                    $scope.monitorChannels = result.data;
                }
            });
        }

        function loadSubMonitor (params) {
            $scope.monitorModel.loadSubMonitor(params, function (result) {
                if(result.success) {
                    $scope.subMonitors = result.data;
                }
            });
        }

        function addMonitorItem () {
            var params={
                productId: $routeParams.productId,
                monitorName: $('form[name=formMonitorAdd] #add_monitor_name').val(),
                monitorLevel: $('form[name=formMonitorAdd] #add_monitor_level').val(),
                monitorType: $('form[name=formMonitorAdd] input[name=monitorType]:checked').attr('radioName'),
                monitorTypeId: $('form[name=formMonitorAdd] input[name=monitorType]:checked').val(),
                subMonitorType: $('form[name=formMonitorAdd] #add_sub_monitor_type option:selected').text(),
                subMonitorTypeId: $('form[name=formMonitorAdd] #add_sub_monitor_type').val(),
                channel: $('form[name=formMonitorAdd] #add_channel option:selected').attr('name'),
                period: $('form[name=formMonitorAdd] #add_period').val(),
                timeout: $('form[name=formMonitorAdd] #add_time_out').val(),
                scriptPath: $('form[name=formMonitorAdd] #add_script_path').val(),
                apiUrl: $('form[name=formMonitorAdd] #add_api_url').val(),
                firstChargeEmail: $('form[name=formMonitorAdd] #add_first_charge_name').val(),
                firstChargePhoneNo: $('form[name=formMonitorAdd] #add_first_charge_no').val(),
                secondChargeEmail: $('form[name=formMonitorAdd] #add_second_charge_name').val(),
                secondChargePhoneNo: $('form[name=formMonitorAdd] #add_second_charge_no').val(),
                thirdChargeEmail: $('form[name=formMonitorAdd] #add_third_charge_name').val(),
                thirdChargePhoneNo: $('form[name=formMonitorAdd] #add_third_charge_no').val(),
                fourthChargeEmail: $('form[name=formMonitorAdd] #add_fourth_charge_name').val(),
                fourthChargePhoneNo: $('form[name=formMonitorAdd] #add_fourth_charge_no').val(),
                extraEmailList: $('form[name=formMonitorAdd] #add_extra_email_list').val(),
                emailLimit: $('form[name=formMonitorAdd] input[name=mail-level]:checked').val(),
                telephoneLimit: $('form[name=formMonitorAdd] input[name=msn-level]:checked').val(),
                sla: $('form[name=formMonitorAdd] #sla').val(),
                info: $('form[name=formMonitorAdd] #info').val()
            };
            // console.log(params);
            $scope.monitorModel.addMonitorItem(params, function (result) {
                if(result.success){
                    $location.path('/monitor/' + $routeParams.productId, true);
                }
            });
        }
    }
]);