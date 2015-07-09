/**
 * Created by zhujiawei on 2015/3/11.
 */
'use strict';

(function(app){
    app.factory('sysInfoModel', ['$http','CONFIG',
            function ($http,CONFIG) {
                function sysInfoModel(data) {

                }

                sysInfoModel.prototype = {
                        setData: function(data) {
                    },
                    getChannels: function(params, callback) {
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
                    }
                };
                return sysInfoModel;
            }]
    );
})(app);