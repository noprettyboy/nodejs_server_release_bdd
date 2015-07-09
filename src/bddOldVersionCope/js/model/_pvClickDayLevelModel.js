/**
 * @file
 * Created by zhangzengwei on 2015/6/11.
 */
'use strict';
/* globals app */
(function (app) {
    app.factory('PvClickDayLevelModel', ['$http', 'CONFIG',
            function ($http, CONFIG) {
                function PvClickDayLevelModel(data) {

                }
                PvClickDayLevelModel.prototype = {
                    setData: function (data) {},
                    loadData: function (params, callback) {
                        $('body .loading-div').addClass('show-loading');
                        var scope = this;
                        $.each(params, function (i, e) {
                            if (e == null || e === '') {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url: CONFIG.pvClickDayLevel,
                            params: params,
                            method: 'GET'
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
                    loadLineChartData: function (params, callback) {
                        var scope = this;
                        $.each(params, function (i, e) {
                            if (e == null || e === '') {
                                delete params[i];
                            }
                        });
                        var tempObj = {
                            url: CONFIG.pvClickDayLevelLineChart,
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
                return PvClickDayLevelModel;
            }]
    );
})(app);