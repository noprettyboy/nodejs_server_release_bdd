/**
 * Created by zhangzengwei on 2015/4/28.
 */

app.controller('monitorController', ['$scope', '$routeParams', '$location', '$compile', 'monitorModel',
    function($scope, $routeParams, $location, $compile, monitorModel) {
        pageInit();    

        $scope.addMonitorItem = function () {
            $location.path('/monitor/' + $routeParams.productId + '/add', true);       
        }

        $scope.editMonitorItem = function(monitorId){
            $location.path('/monitor/' + $routeParams.productId + '/edit/' + monitorId, true);
        }

        $scope.searchMonitor = function () {
            loadMonitorData();
        }

        $scope.switchProduct = function (event) {
            // console.log(event.target.tagName);
            if (event.target.tagName === 'LI') {
                $location.path('/monitor/' + $(event.target).val(), true);
            } else if (event.target.tagName === 'SPAN') {
                $location.path('/monitor/' + $(event.target).parent().val(), true);
            } 
        };
        $scope.getClass = function (status) {
            if (!status) {
                return 'enable-a';
            } else {
                return 'unenable-a';
            }
        };
        $scope.enableMonitorItem = function (id, status) {
            var params = {
                productId: $routeParams.productId,
                monitorId: id
            };
            if (status) {
                params.opType = 0;
            } else {
                params.opType = 1;
            }
            // console.log(params);
            enableMonitor(params);
        }


        function pageInit () {
            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=monitor]').addClass('current-li');

            $('#monitor .monitor-left ul li').removeClass('choise-tree-node');
            $('#monitor .monitor-left ul li[value=' + $routeParams.productId + ']').addClass('choise-tree-node');

            window.onresize=resizeWidth;
            // var curBrowserWidth = $(window).width();
            var curBrowserHeight = $(window).height();
            function resizeWidth(){
                // curBrowserWidth = $(window).width();
                curBrowserHeight = $(window).height();
                console.log(curBrowserHeight);
                $('div#container div.tree-div').css('height', curBrowserHeight-120);
                $('body div.loading-div').css('height', curBrowserHeight);
                $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight/2-150);

                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $scope.monitorModel = new monitorModel();

            loadChannel();
            loadMonitorData();
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

        function loadMonitorName (params) {
            $scope.monitorModel.loadMonitorName(params, function (result) {
                if(result.success) {
                    $scope.monitorNames = result.data;
                }
            });
        }

        function loadMonitorData () {
            var params={};
            params.monitorName = $('#search_monitor_name').val();
            params.monitorLevel = $('#search_monitor_level').val();
            params.monitorType = $('#search_monitor_type').val();
            params.channel = $('#search_monitor_channel option:selected').attr('name');
            params.productId = $routeParams.productId;
            $scope.monitorModel.load(params, function (result) {
                if(result.success){
                    $scope.loadMonitorData = result.data;
                    // console.log($scope.loadMonitorData);
                    $scope.tableData = result.data.monitorList;
                    $.table({
                        location: 'div#monitor_table_div', //must
                        name: 'displayTable', //must
                        unit: '%', //px or % Default Value "px"
                        lineHeight: 30,
                        width: 100,
                        align: 'center',
                        style: {
                            align: 'center',
                            caption: 'font-weight: bold; font-size: 15px;'
                        },
                        columns: [
                            { name: '监控项ID', field: 'id', width:5, type: 'text' },
                            { name: '监控项名称', field: 'monitorName', width: 25, type: 'text' },
                            { name: '监控级别', field: 'monitorLevel', html: '<span>P{{columnItem.monitorLevel}}</span>', width: 5, type: 'html' },
                            { name: '监控类型', field: 'monitorType', width: 10, type: 'text' },
                            { name: '运行周期', field: 'period', width: 5, type: 'text' },
                            { name: '负责人', field: 'owner', width: 25, type: 'text' },
                            {name: '操作', field: '',
                                html: '<a  class="edit-item" ng-click="editMonitorItem(columnItem.id)">编辑</a>'
                                + '<a  class="edit-item" ng-class="getClass(columnItem.status)"'
                                + ' ng-click="enableMonitorItem(columnItem.id, columnItem.status)"'
                                + ' ng-show="{{columnItem.monitorTypeId==3 ? false : true}}">'
                                + '{{columnItem.status==0 ? "启用" : "停用"}}</a>', width: 10, type: 'html'},
                            { name: '创建人', field: 'creater', width: 15, type: 'text' }
                        ],
                        dataName: 'tableData',
                        dataCount: $scope.tableData.length,
                        nullDataStr: '无数据！'
                    });
                    $compile('div#monitor_table_div')($scope);
                }
            });
        }

        function enableMonitor(params) {
            $scope.monitorModel.enableMonitor(params, function (result) {
                if (result.success) {
                    loadMonitorData();
                }
            });
        }
    }
]);