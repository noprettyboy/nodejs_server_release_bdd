/**
 * Created by zhangzengwei on 2015/4/28.
 */
'use strict';
(function(app){
    app.factory('AlarmModel', ['$http', 'CONFIG',
        function ($http,CONFIG) {
            function AlarmModel(data) {

            }
            AlarmModel.prototype = {
                setData: function(data) {

                },
                loadAlarmList: function(params, callback) {
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.alarm,
                        params: params,
                        method: 'GET'
                    };
                    $http(tempObj).success(
                        function(data) {
                            $('body .loading-div').removeClass('show-loading');
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ''){
                                    $('.common-alert-dialog .modal-body').text('请求后台数据错误！');
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
                loadMonitorNames: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.monitorNames,
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
                pushNextOne: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.alarmNotify,
                        params: params,
                        method: 'GET'
                    };
                    $http(tempObj).success(
                        function(data) {
                            if (data.success) {
                                if (callback) {
                                    callback(data);
                                }
                            } else {
                                if(!data.message || data.message == ''){
                                    $('.common-alert-dialog .modal-body').text('提交后台数据错误！');
                                    $('.common-alert-dialog').modal('show');
                                }else
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                    // $('.modal-resolve-alarm').modal('hide');
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
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
                getBatchResolveInfo: function (params, callback) {
                    var scope = this;
                    $.each(params, function (i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.alarmBatchResolve,
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
                },
                resolve: function (params, callback) {
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function (i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.alarmResolve,
                        params: params,
                        method: 'PUT'
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
                                    $('.common-alert-dialog .modal-body').text('提交后台数据错误！');
                                } else {
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                }
                                // $('.modal-resolve-alarm').modal('hide');
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                },
                resolveBatch: function (params, callback) {
                    $('body .loading-div').addClass('show-loading');
                    var scope = this;
                    $.each(params, function (i, e) {
                        if (e == null || e === '') {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url: CONFIG.alarmBatchResolve,
                        params: params,
                        method: 'PUT'
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
                                    $('.common-alert-dialog .modal-body').text('提交后台数据错误！');
                                } else {
                                    $('.common-alert-dialog .modal-body').text(data.message);
                                }
                                // $('.modal-resolve-alarm').modal('hide');
                                $('.common-alert-dialog').modal('show');
                                return false;
                            }
                        }
                    );
                }
            };
            return AlarmModel;
        }
    ]);
})(app);