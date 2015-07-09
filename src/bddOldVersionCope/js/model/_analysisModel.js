/**
 * Created by zhangzengwei on 2015/5/22.
 */
'use strict';
(function(app){
    app.factory('analysisModel', ['$http','CONFIG',
        function ($http,CONFIG) {
            function analysisModel(data) {

            }
            analysisModel.prototype = {
                setData: function(data) {

                },
                loadChannel: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.channel,
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
                                if(!data.message || data.message == ""){
                                    $('.common-alert-dialog .modal-body').text("请求后台数据错误！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                loadData: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.analysis,
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
                                if(!data.message || data.message == ""){
                                    $('.common-alert-dialog .modal-body').text("请求后台数据错误！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                loadCaeMonitorData: function(params, callback) {
                    var scope = this;
                    // $.each(params, function(i, e) {
                    //     if (e == null || e === "") {
                    //         delete params[i];
                    //     }
                    // });
                    var tempObj = {
                        url:CONFIG.analysisCaeMonitor,
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
                                if(!data.message || data.message == ""){
                                    $('.common-alert-dialog .modal-body').text("请求后台数据错误！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                loadMonitorName: function (params, callback) {
                    var scope = this;
                    $.each(params, function (i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.monitorNames,
                        params: params,
                        method: 'GET'
                    };
                    $http(tempObj).success(
                        function (data) {
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if (!data.message || data.message === '') {
                                    $('.common-alert-dialog .modal-body').text('请求后台数据错误！');
                                } else {
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                }
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                }
            };
            return analysisModel;
        }
    ]);
})(app);