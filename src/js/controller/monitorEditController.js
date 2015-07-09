/**
 * Created by zhangzengwei on 2015/5/8.
 */
app.controller('monitorEditController', ['$scope', '$routeParams', '$location', '$compile', 'monitorModel',
    function($scope, $routeParams, $location, $compile, monitorModel) {
        pageInit();


        $scope.goBackMonitor = function () {
            $location.path('/monitor/' + $routeParams.productId, true);
        }

        $scope.saveMonitorItem = function () {
            editMonitorItem();
        }
        

        function pageInit () {  
            console.log($scope.monitor); 
            $scope.monitor = {};
            $scope.monitorModel = new monitorModel();
            loadChannel();
            loadMonitorItem();  
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

        function loadMonitorItem () {
            var params = {
                productId: $routeParams.productId,
                monitorId: $routeParams.monitorId
            };
            $scope.monitorModel.load(params, function (resultMonitorItem) {
                if(resultMonitorItem.success){
                    var curMonitorTypeId = resultMonitorItem.data.monitorList[0].monitorTypeId;
                    var params = {
                        monitorTypeId: curMonitorTypeId
                    }
                    $scope.monitorModel.loadSubMonitor(params, function (resultSubMonitor) {
                        if(resultSubMonitor.success) {
                            $scope.subMonitors = resultSubMonitor.data;
                            $scope.monitor.name = resultMonitorItem.data.monitorList[0].monitorName;
                            $scope.monitor.type = resultMonitorItem.data.monitorList[0].monitorLevel;
                            $scope.monitor.monitorType = resultMonitorItem.data.monitorList[0].monitorTypeId;
                            // $scope.monitor.subType = '2';//resultMonitorItem.data.monitorList[0].subMonitorTypeId;
                            $scope.monitor.channel = resultMonitorItem.data.monitorList[0].channel;
                            $scope.monitor.period = resultMonitorItem.data.monitorList[0].period;
                            $scope.monitor.overTime = resultMonitorItem.data.monitorList[0].timeout;
                            $scope.monitor.scriptPath = resultMonitorItem.data.monitorList[0].scriptPath;
                            $scope.monitor.apiUrl = resultMonitorItem.data.monitorList[0].url;
                            $scope.monitor.firstChargeName = resultMonitorItem.data.monitorList[0].firstChargeEmail;
                            $scope.monitor.firstChargeNo = resultMonitorItem.data.monitorList[0].firstChargePhoneNo;
                            $scope.monitor.secondChargeName = resultMonitorItem.data.monitorList[0].secondChargeEmail;
                            $scope.monitor.secondChargeNo = resultMonitorItem.data.monitorList[0].secondChargePhoneNo;
                            $scope.monitor.thirdChargeName = resultMonitorItem.data.monitorList[0].thirdChargeEmail;
                            $scope.monitor.thirdChargeNo = resultMonitorItem.data.monitorList[0].thirdChargePhoneNo;
                            $scope.monitor.fourthChargeName = resultMonitorItem.data.monitorList[0].fourthChargeEmail;
                            $scope.monitor.fourthChargeNo = resultMonitorItem.data.monitorList[0].fourthChargePhoneNo;
                            $scope.monitor.extraChargeName = resultMonitorItem.data.monitorList[0].extraEmailList;
                            $scope.monitor.telephoneLimit = resultMonitorItem.data.monitorList[0].telephoneLimit;
                            $scope.monitor.emailLimit = resultMonitorItem.data.monitorList[0].emailLimit;
                            $scope.monitor.sla = resultMonitorItem.data.monitorList[0].sla === 0 ?
                            (resultMonitorItem.data.monitorList[0].sla).toFixed(1) :
                            resultMonitorItem.data.monitorList[0].sla;
                            $scope.monitor.info = resultMonitorItem.data.monitorList[0].info;

                            $scope.monitor.subType = resultMonitorItem.data.monitorList[0].subMonitorTypeId;                           
                            setTimeout(function () {
                                $('form[name=formMonitorEdit] #add_sub_monitor_type').val(resultMonitorItem.data.monitorList[0].subMonitorTypeId);
                            }, 100);
                        }
                    });
                }
            });
        }

        function editMonitorItem () {
            var params={
                productId: $routeParams.productId,
                id: $routeParams.monitorId,
                monitorName: $('form[name=formMonitorEdit] #add_monitor_name').val(),
                monitorLevel: $('form[name=formMonitorEdit] #add_monitor_level').val(),
                monitorType: $('form[name=formMonitorEdit] input[name=monitorType]:checked').attr('radioname'),
                monitorTypeId: $('form[name=formMonitorEdit] input[name=monitorType]:checked').val(),
                subMonitorType: $('form[name=formMonitorEdit] #add_sub_monitor_type option:selected').text(),
                subMonitorTypeId: $('form[name=formMonitorEdit] #add_sub_monitor_type').val(),
                channel: $('form[name=formMonitorEdit] #add_channel option:selected').attr('name'),
                period: $('form[name=formMonitorEdit] #add_period').val(),
                timeout: $('form[name=formMonitorEdit] #add_time_out').val(),
                scriptPath: $('form[name=formMonitorEdit] #add_script_path').val(),
                apiUrl: $('form[name=formMonitorEdit] #add_api_url').val(),
                firstChargeEmail: $('form[name=formMonitorEdit] #add_first_charge_name').val(),
                firstChargePhoneNo: $('form[name=formMonitorEdit] #add_first_charge_no').val(),
                secondChargeEmail: $('form[name=formMonitorEdit] #add_second_charge_name').val(),
                secondChargePhoneNo: $('form[name=formMonitorEdit] #add_second_charge_no').val(),
                thirdChargeEmail: $('form[name=formMonitorEdit] #add_third_charge_name').val(),
                thirdChargePhoneNo: $('form[name=formMonitorEdit] #add_third_charge_no').val(),
                fourthChargeEmail: $('form[name=formMonitorEdit] #add_fourth_charge_name').val(),
                fourthChargePhoneNo: $('form[name=formMonitorEdit] #add_fourth_charge_no').val(),
                extraEmailList: $('form[name=formMonitorEdit] #add_extra_email_list').val(),
                emailLimit: $('form[name=formMonitorEdit] input[name=mail-level]:checked').val(),
                telephoneLimit: $('form[name=formMonitorEdit] input[name=msn-level]:checked').val(),
                sla: $('form[name=formMonitorEdit] #sla').val(),
                info: $('form[name=formMonitorEdit] #info').val()
            };
            $scope.monitorModel.edit(params, function (result) {
                if(result.success){
                    $location.path('/monitor/' + $routeParams.productId, true);
                }
            });
        }
    }
]);