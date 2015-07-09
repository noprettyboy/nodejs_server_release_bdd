/**
 * Created by zhujiawei on 2015/3/11.
 */
'use strict';

(function(app){
    app.factory('alarmResolveModel', ['$http','CONFIG',
            function ($http,CONFIG) {
                function alarmResolveModel(data) {

                }
                alarmResolveModel.prototype = {
                        setData: function(data) {
                    },
                    getAlarmDetail: function(params, callback) {
                        var scope = this;
                        $.each(params, function(i, e) {
                            if (e == null || e === "") {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url:CONFIG.alarmDetail,
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
                    getResolveInfo: function(params, callback) {
                        var scope = this;
                        $.each(params, function(i, e) {
                            if (e == null || e === "") {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url:CONFIG.alarmResolve,
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
                    resolve: function(params, callback) {
                        var scope = this;
                        $.each(params, function(i, e) {
                            if (e == null || e === "") {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url:CONFIG.alarmResolve,
                            params: params,
                            method: "PUT"
                        };
                        $http(tempObj).success(
                            function(data) {
                                if (data.success) {
                                    if (callback) {
                                        callback(data);
                                    }
                                } else {
                                    if(!data.message || data.message == ""){
                                        $('.common-alert-dialog .modal-body').text("提交后台数据错误！");
                                    }else
                                        $('.common-alert-dialog .modal-body').text(data.message);
                                    $('.modal-resolve-alarm').modal('hide');
                                    $('.common-alert-dialog').modal('show');
                                    return false;
                                }
                            }
                        );
                    },
                    pushNextOne: function(params, callback) {
                        var scope = this;
                        $.each(params, function(i, e) {
                            if (e == null || e === "") {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url:CONFIG.alarmNotify,
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
                                        $('.common-alert-dialog .modal-body').text("提交后台数据错误！");
                                    }else
                                        $('.common-alert-dialog .modal-body').text(data.message);
                                    $('.modal-resolve-alarm').modal('hide');
                                    $('.common-alert-dialog').modal('show');
                                    return false;
                                }
                            }
                        );
                    }
                };
                return alarmResolveModel;
            }]
    );
})(app);