app.controller('DetailViewController', ['$scope', '$routeParams', '$location','monitorList','alarmModel','entiretyModel','alarmResolveModel','sysInfoModel',
    function($scope, $routeParams, $location,monitorList,alarmModel,entiretyModel,alarmResolveModel,sysInfoModel) {

        //judge  switch page by location path
        var pageName = $routeParams.pageName;
        var productId = $routeParams.productId;
        var detailID = $routeParams.detailID;
        $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
        if (pageName === "entirety") {
            $("div#header ul.nav li").removeClass("current-li");
            $("div#header ul.nav li[name=entirety]").addClass("current-li");
            $("#content_left ul li").removeClass("choise-tree-node");
            $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
            $("div#detailView div.entirety-content").removeClass("hidden-detailView-content").addClass("show-detailView-content");
            $("#content_left").removeClass("normal-left-content").addClass("hide-left-content");
            $("#content_right").removeClass("normal-right-content").addClass("show-right-content");
            initialProductStatus();
        } else if (pageName === "trend") {
            $("div#header ul.nav li").removeClass("current-li");
            $("div#header ul.nav li[name=trend]").addClass("current-li");
            $("#content_left ul li").removeClass("choise-tree-node");
            $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
            $("div#detailView div.trend-content").removeClass("hidden-detailView-content").addClass("show-detailView-content");
            $("#content_left").removeClass("hide-left-content").addClass("normal-left-content");
            $("#content_ritht").removeClass("show-right-content").addClass("normal-right-content");
        } else if (pageName === "flow") {
            $("div#header ul.nav li").removeClass("current-li");
            $("div#header ul.nav li[name=flow]").addClass("current-li");
            $("#content_left ul li").removeClass("choise-tree-node");
            $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
            $("div#detailView div.flow-content").removeClass("hidden-detailView-content").addClass("show-detailView-content");
            $("#content_left").removeClass("hide-left-content").addClass("normal-left-content");
            $("#content_ritht").removeClass("show-right-content").addClass("normal-right-content");
        } else if (pageName === "monitor") {
            $("div#header ul.nav li").removeClass("current-li");
            $("div#header ul.nav li[name=monitor]").addClass("current-li");
            $("#content_left ul li").removeClass("choise-tree-node");
            $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
            $("div#detailView div.monitor-content").removeClass("hidden-detailView-content").addClass("show-detailView-content");
            $("#content_left").removeClass("hide-left-content").addClass("normal-left-content");
            $("#content_ritht").removeClass("show-right-content").addClass("normal-right-content");
            getChannels();
            loadMonitorData();
        } else if (pageName === "alarm") {
            $("div#header ul.nav li").removeClass("current-li");
            $("div#header ul.nav li[name=alarm]").addClass("current-li");
            $("#content_left ul li").removeClass("choise-tree-node");
            $("#content_left ul li[value="+productId+"]").addClass("choise-tree-node");
            $("div#detailView div.alarm-content").removeClass("hidden-detailView-content").addClass("show-detailView-content");
            $("#content_left").removeClass("hide-left-content").addClass("normal-left-content");
            $("#content_ritht").removeClass("show-right-content").addClass("normal-right-content");
            $('#search_alarm_begin_time').datetimepicker();
            $('#search_alarm_end_time').datetimepicker();
            if(detailID) {
                $('#search_alarm_id').val(detailID);
                $('#search_alarm_scope').val(1)
            }
            getChannels();
            initialAlarmData();
        } else {
            $location.path("/entirety", true);
        }

        /*--- entirety controller begin ---*/

        function initialProductStatus(){
            if(!$scope.entiretyModel){
                $scope.entiretyModel = new entiretyModel();
            }
            var params = {};
            $scope.entiretyModel.getEntireMonitorStatus(params,function(result){
                if(result.success){
                    $scope.loadEntiretyData = result.data.productStatusDates;
                    setTimeout(function(){
                        if(result.data.productStatusDates.length > 0) {
                            for(var i = 0 ; i < result.data.productStatusDates.length ; i++) {
                                var productId = result.data.productStatusDates[i].productId;
                                var score = result.data.productStatusDates[i].score;
                                // $("#yyy_score" + productId).css({"backgroundColor" : getColorByScore(score)});
                                $("#yyy_score" + productId).css({"border" : "solid 1px "+getColorByScore(score), "background-color": getColorByScore(score)});
                                $("#xxx_info" + productId).css({"border" : "solid 1px #bbbbbb", "color": "#bbbbbb"});
                                // $("#xxx_info" + productId).css({"border-left" : "10px solid "+getColorByScore(score)});
                            }

                            $(".xxx div a").mouseover(function(){
                                var score =$(this).attr("score");
                                var productName = $(this).attr("name");
                                var p0Count = $(this).attr("p0Count");
                                var p1Count = $(this).attr("p1Count");
                                var p2Count = $(this).attr("p2Count");
                                var text = productName + "<br>P0报警:" + p0Count+",p1报警:" + p1Count+",p2报警:" + p2Count;
                                // $(this).css({"backgroundColor": getColorByScore(score)});
                                $(this).html(text);
                            });
                            $(".xxx div a").mouseout(function(){
                                var score =$(this).attr("score");
                                var productName = $(this).attr("name");
                                // $(this).css({"backgroundColor": "#444"});
                                $(this).text(productName);
                            });
                        }
                    },100);
                }
            });
        }



        function getColorByScore(score){
            if ( score == 100 ) {
               return "#1abc9c";
            }
            if ( score >= 50 && score < 100) {
               return "#3498db";
            }
            if (score < 50 && score >= 0) {
                return "#f0776c";
            }
            // if (score == 0) {
            //     return "#FA0707";
            // }
        }

        /*--- entirety controller end ---*/

        /*--- monitor controller begin ---*/
        $scope.addMonitorItem = function(){
            $("#common_dialog .form-add-monitor-data")[0].reset();
            $('.modal-add-monitor').modal({backdrop: 'static', keyboard: false});
            $('.modal-add-monitor').modal('show');
        }
        $scope.editMonitorItem = function(monitorId){
            if(!$scope.monitorList){
                $scope.monitorList = new monitorList();
            }
            var params = {};
            params.monitorId = monitorId;
            params.productId = productId;

            var editLoadMonitorData = {};
            $scope.monitorList.load(params,function(result) {
                if(result.success){
                    editLoadMonitorData=result.data.monitorList[0];
                    editLoadMonitorData.monitorId = monitorId;
                    $scope.$emit('from-monitor',editLoadMonitorData);
                }
            });
        }
        $scope.deleteMonitorItem = function() {
            $('.modal-delete-monitor').modal({backdrop: 'static', keyboard: false});
            $('.modal-delete-monitor').modal('show');
        }
        //search monitor list with chosen params
        $scope.searchMonitor = function() {
            loadMonitorData();
        }
        $("#add_monitor_submit").unbind("click");
        $("#add_monitor_submit").on("click", function() {
            var params={};
            params.scriptPath =$("#add_script_path").val();
            params.apiUrl = $("#add_api_url").val();
            params.monitorName = $("#add_monitor_name").val();
            params.productId = $("#content_left ul.nav-stacked li.choise-tree-node").val();
            params.monitorLevel = $("#add_monitor_level").val();
            params.monitorTypeId =$("#add_monitor_type input[name=monitorType]:checked").val();
            params.monitorType = $("#add_monitor_type input[name=monitorType]:checked").attr("radioName");
            params.subMonitorTypeId = $("#add_sub_monitor_type").val();
            params.subMonitorType = $("#add_sub_monitor_type option:selected").text();
            params.channel = $("#add_channel option:selected").attr("name");
            //params.validTime = $("#add_valid_time").val();
            params.period = $("#add_period").val();
            params.timeout = $("#add_time_out").val();
            params.firstChargeEmail=$("#add_first_charge_name").val();
            params.firstChargePhoneNo=$("#add_first_charge_no").val();
            params.secondChargeEmail=$("#add_second_charge_name").val();
            params.secondChargePhoneNo=$("#add_second_charge_no").val();
            params.thirdChargeEmail=$("#add_third_charge_name").val();
            params.thirdChargePhoneNo=$("#add_third_charge_no").val();
            params.fourthChargeEmail=$("#add_fourth_charge_name").val();
            params.fourthChargePhoneNo=$("#add_fourth_charge_no").val();
            params.extraEmailList = $("#add_extra_email_list").val();
            params.emailLimit = $("#radio_add_monitor_mail_level input[name=mail-level]:checked").val();
            params.telephoneLimit = $("#radio_add_monitor_msn_level input[name=msn-level]:checked").val();
            if(!$scope.monitorList){
                $scope.monitorList = new monitorList();
            }
            $scope.monitorList.submit(params,function(result){
                if(result.success){
                    loadMonitorData();
                }
            });
        });
        $("#edit_monitor_submit").unbind("click");
        $("#edit_monitor_submit").on("click",function(){
            var params={};
            params.id = $("#edit_monitor_id").attr("value");
            params.scriptPath =$("#edit_script_path").val();
            params.apiUrl = $("#edit_api_url").val();
            params.monitorName = $("#edit_monitor_name").val();
            params.productId = $("#content_left ul.nav-stacked li.choise-tree-node").val();
            params.monitorLevel = $("#edit_monitor_level").val();
            //params.monitorTypeId =$("#edit_monitor_type input[name=monitorType]:checked").val();
            //params.monitorType = $("#edit_monitor_type input[name=monitorType]:checked").attr("radioName");
            //params.subMonitorTypeId = $("#edit_sub_monitor_type").val();
            //params.subMonitorType = $("#edit_sub_monitor_type option:selected").attr("name");
            //params.channel = $("#edit_channel option:selected").attr("name");
            //params.validTime = $("#edit_valid_time").val();
            params.period = $("#edit_period").val();
            params.timeout = $("#edit_time_out").val();
            params.firstChargeEmail=$("#edit_first_charge_name").val();
            params.firstChargePhoneNo=$("#edit_first_charge_no").val();
            params.secondChargeEmail=$("#edit_second_charge_name").val();
            params.secondChargePhoneNo=$("#edit_second_charge_no").val();
            params.thirdChargeEmail=$("#edit_third_charge_name").val();
            params.thirdChargePhoneNo=$("#edit_third_charge_no").val();
            params.fourthChargeEmail=$("#edit_fourth_charge_name").val();
            params.fourthChargePhoneNo=$("#edit_fourth_charge_no").val();
            params.extraEmailList = $("#edit_extra_email_list").val();
            params.emailLimit = $("#radio_edit_monitor_mail_level input[name=mail-level]:checked").val();
            params.telephoneLimit = $("#radio_edit_monitor_msn_level input[name=msn-level]:checked").val();
            if(!$scope.monitorList){
                $scope.monitorList = new monitorList();
            }
            $scope.monitorList.edit(params,function(result){
                if(result.success){
                    loadMonitorData();
                }
            });
        });
        function loadMonitorData(){
            var params={};
            params.monitorName = $("#search_monitor_name").val();
            params.monitorLevel = $("#search_monitor_level").val();
            params.monitorType = $("#search_monitor_type").val();
            params.channel = $('#search_monitor_channel option:selected').attr("name");
            params.productId =productId;
            if(!$scope.monitorList){
                $scope.monitorList = new monitorList();
            }
            $scope.monitorList.load(params,function(result){
                if(result.success){
                    $scope.loadMonitorData=result.data;
                }
            });
        }
        /*--- monitor controller end ---*/

        /*--- alarm list controller begin ---*/
        $scope.loadAlarmList = function(monitorTypeId){
            $("#alarm_content ul.sub-alarm-nav-menu li").removeClass("current-li");
            $("#alarm_content ul.sub-alarm-nav-menu li[value="+monitorTypeId+"]").addClass("current-li");
            initialAlarmData();
        }
        $scope.searchAlarm = function(){
            var params = {};
            params.productId = productId;
            params.monitorTypeId = $(".sub-alarm-nav li.current-li").val();
            params.pageSize = $("#number_per_page option:selected").val();
            params.pageIndex = 1;
            loadAlarmData(params);
        }
        $scope.jumpAlarmPage = function(tag){
            var params = {};
            params.productId = productId;
            params.monitorTypeId = $(".sub-alarm-nav li.current-li").val();
            params.pageSize = $("#number_per_page option:selected").val();
            if("pre_page" == tag){
                params.pageIndex =  parseInt($(".current-page-no").attr("pageIndex")) -1;
            }else if("next_page" == tag){
                params.pageIndex = parseInt($(".current-page-no").attr("pageIndex")) +1
            }
            loadAlarmData(params);
        }
        $scope.turnAlarPage = function(target){
            var params = {};
            params.productId = productId;
            params.monitorTypeId = $(".sub-alarm-nav li.current-li").val();
            params.pageSize = $("#number_per_page option:selected").val();
            params.pageIndex = target;
            if( parseInt(params.pageIndex) > parseInt($('.total-alarm-page-count').attr("totalCount"))){
                $('.common-alert-dialog .modal-body').text("不能超过总页数！");
                $('.common-alert-dialog').modal('show');
            }else {
                loadAlarmData(params);
            }
        }
        $scope.refreshSearchAlarmDate = function() {
            $('#search_alarm_begin_time').val("");
            $('#search_alarm_end_time').val("")
        }
        $("#number_per_page").on('change', function() {
            var params = {};
            params.productId = productId;
            params.monitorTypeId = $(".sub-alarm-nav li.current-li").val();
            params.pageSize = $("#number_per_page option:selected").val();
            params.pageIndex = $(".current-page-no").attr("pageIndex");
            loadAlarmData(params);
        });
        $scope.resolveAlarm = function(alarmId){
            if(! $scope.alarmResolveModel){
                $scope.alarmResolveMode = new alarmResolveModel();
            }
            var params = {};
            params.alarmId = alarmId;
            $scope.alarmResolveMode.getAlarmDetail(params, function(result1){
                if (result1.success) {
                    $scope.$emit('from-alarm-alarm-detail', result1.data);
                    $scope.alarmResolveMode.getResolveInfo(params, function(result2){
                        if(result2.success) {
                            $scope.$emit('from-alarm-resolve-info', result2.data);
                            $('.modal-resolve-alarm').modal({backdrop: 'static', keyboard: false});
                            $('.modal-resolve-alarm').modal('show');
                            setTimeout(function(){
                                initResolveTimelineNodes(result2.data.handleProcess);
                            },100);
                        }
                    });
                }
            });
        }
        $scope.pushNextOne = function(alarmId){
            if(! $scope.alarmResolveModel){
                $scope.alarmResolveMode = new alarmResolveModel();
            }
            var params = {};
            params.alarmId = alarmId;
            $scope.alarmResolveMode.pushNextOne(params, function(result) {
                if(result.success){
                    $('.common-alert-dialog .modal-body').text("催办下一个处理人员成功！");
                    $('.common-alert-dialog').modal('show');
                }
            });
        }
        $scope.disabledATab = function (url) {
            if (url == '') {
                $('.common-alert-dialog .modal-body').text('URL为空，无法完成预览！');
                $('.common-alert-dialog').modal('show');
                return false;
            } else {
                window.open(url);
            }
        }


        function initialAlarmData(){
            var params = {};
            params.productId = productId;
            params.monitorTypeId = $(".sub-alarm-nav-menu li.current-li").val();
            params.pageSize = $("#number_per_page option:selected").val();
            params.pageIndex = 1;
            loadAlarmData(params);
        }
        function loadAlarmData(params){
            loadSearchParas(params);
            if(!$scope.alarmModel){
                $scope.alarmModel = new alarmModel();
            }
            $scope.alarmModel.getAlarmList(params, function (result) {
                if(result.success){
                    $scope.loadAlarmData = result.data;
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
        function loadSearchParas (param){
            param.channel = $('#search_alarm_channel option:selected').attr("name");
            param.status = $('#search_alarm_status').val();
            var scopeTag = $('#search_alarm_scope').val();
            if(scopeTag == 0){
                param.username = $('#userName').text();
            } else {
                param.username = "";
            }
            param.beginTime = $('#search_alarm_begin_time').val();
            param.endTime = $('#search_alarm_end_time').val();
            param.monitorLevel = $('#search_alarm_level').val();
            param.alarmId = $('#search_alarm_id').val();
            param.monitorName = $('#search_alarm_name').val();
        }
        function initResolveTimelineNodes(params,callback) {
            var liNodes = $('.modal-resolve-alarm .timeline li');
            var count = liNodes.length;
            var i;
            var liNode;
            for(i=0; i<count; i++) {
                liNode = $(liNodes.get(i));
                if(params[i].status == 1 || params[i].status == 2){
                    liNode.find('.resolve-action').addClass("hide");
                    liNode.removeClass('alt');
                    liNode.find('.resolve-info-input').val(params[i].handleAdvice);
                    liNode.find('.resolve-info-input').attr("readonly","readonly");
                }else{
                    liNode.addClass('alt');
                }
            }
            liNode.find('.submit-to-next').addClass("hide");
            // add click action to the resolve action buttons
            $("li.click-li").unbind("click");
            $("li.click-li").on("click", function (e) {
                if(e.target.tagName == "BUTTON"){
                    var par = {};
                    if($(e.target).attr("class") == "submit-to-next"){
                        par.status = 1;
                    }else {
                        par.status = 2;
                    }
                    var pNode = $(e.target).parents(".click-li");
                        par.id = pNode.val();
                        par.handleAdvice = (pNode.find(".resolve-info-input")).val();
                    if(!$scope.alarmResolveMode){
                        $scope.alarmResolveMode = new alarmResolveMode();
                    }
                    $scope.alarmResolveMode.resolve(par, function (result) {
                        if(result.success) {
                            $('.modal-resolve-alarm').modal('hide');
                            initialAlarmData();
                        }
                    });
                }
            });
            if(callback) {
                callback();
            }
        }
        /*---alarm list controller end ---*/
        function getChannels () {
            if(!$scope.sysInfoModel){
                $scope.sysInfoModel = new sysInfoModel();
            }
            var params = {};
            params.productId = productId;
            $scope.sysInfoModel.getChannels (params, function (result) {
                if(result.success) {
                    $scope.sysInfoChannel = result.data;
                    $scope.$emit('from-sys-info',result.data);
                }
            });
        }
    }
]);