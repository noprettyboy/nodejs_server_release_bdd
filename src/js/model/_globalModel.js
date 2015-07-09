/**
 * Created by zhangzengwei on 2015/4/28.
 */
'use strict';

(function(app){
    app.factory('globalModel', ['$http','CONFIG',
        function ($http , CONFIG) {
            function globalModel(data) {
                // if (data) {
                //     this.setData(data);
                // }
            }
            globalModel.prototype = {
                setData: function(data) {
                },
                getUserInfo: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.user,
                        params: params,
                        method: "GET"
                    };
                    $http(tempObj).success(
                        function(data) {
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ''){
                                    $('.common-alert-dialog .modal-body').text("请求后台数据错误！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                getSubMonitorTypes: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.monitorType,
                        params: params,
                        method: "GET"
                    };
                    $http(tempObj).success(
                        function(data) {
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ''){
                                    $('.common-alert-dialog .modal-body').text("请求后台数据错误！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                }
            };
            return globalModel;
        }
    ]);
})(app);