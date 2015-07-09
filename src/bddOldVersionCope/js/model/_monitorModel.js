/**
 * Created by zhangzengwei on 2015/4/28.
 */
'use strict';
(function(app){
    app.factory('monitorModel', ['$http','CONFIG',
        function ($http,CONFIG) {
            function monitorModel(data) {

            }
            monitorModel.prototype = {
                setData: function(data) {

                },
                load: function(params, callback) {
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.monitor,
                        params: params,
                        method: "GET"
                    };
                    $http(tempObj).success(
                        function(data) {
                            $('body .loading-div').removeClass('show-loading');
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
                loadSubMonitor: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.monitorType,
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
                loadMonitorName: function(params, callback) {
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
                addMonitorItem: function(params, callback){
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.monitor,
                        params: params,
                        method: "POST"
                    };
                    $http(tempObj).success(
                        function(data) {
                            $('body .loading-div').removeClass('show-loading');
                            if (data.success) {
                                // $('.common-alert-dialog .modal-body').text(data.message);
                                // $('.common-alert-dialog').modal('show');
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ""){
                                    $('.common-alert-dialog .modal-body').text("提交数据失败！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                edit: function(params, callback){
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    //$.each(params, function(i, e) {
                    //    if (e == null || e === "") {
                    //        delete params[i];
                    //    }
                    //});
                    var tempObj = {
                        url: CONFIG.monitor,
                        params: params,
                        method:'PUT'
                    };
                    $http(tempObj).success(
                        function(data) {
                            $('body .loading-div').removeClass('show-loading');
                            if (data.success) {
                                // $('.common-alert-dialog .modal-body').text(data.message);
                                // $('.common-alert-dialog').modal('show');
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ""){
                                    $('.common-alert-dialog .modal-body').text("提交数据失败！");
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                enableMonitor: function (params, callback) {
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function (i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.enableMonitor,
                        params: params,
                        method: 'POST'
                    };
                    $http(tempObj).success(
                        function (data) {
                            $('body .loading-div').removeClass('show-loading');
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if (!data.message || data.message === '') {
                                    $('.common-alert-dialog .modal-body').text('提交数据失败！');
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
            return monitorModel;
        }
    ]);
})(app);