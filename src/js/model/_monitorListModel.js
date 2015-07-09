/**
 * Created by zhujiawei on 2015/3/11.
 */
'use strict';

(function(app){
    app.factory('monitorList', ['$http','CONFIG',
            function ($http,CONFIG) {
                function monitorList(data) {

                }

                monitorList.prototype = {
                        setData: function(data) {
                    },
                    load: function(params, callback) {
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

                    submit: function(params, callback){
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
                                if (data.success) {
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                    $('.common-alert-dialog').modal('show');
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
                                if (data.success) {
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                    $('.common-alert-dialog').modal('show');
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
                    }
                };
                return monitorList;
            }]
    );
})(app);