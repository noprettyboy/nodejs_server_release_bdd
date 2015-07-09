/**
 * Created by zhangzengwei on 2015/4/28.
 */
'use strict';
(function(app){
    app.factory('entiretyModel', ['$http','CONFIG',
        function ($http,CONFIG) {
            function entiretyModel(data) {

            }
            entiretyModel.prototype = {
                setData: function(data) {

                },
                getEntireMonitorStatus: function(params, callback) {
                    var scope = this;
                    $.each(params, function(i, e) {
                        if (e == null || e === "") {
                            delete params[i];
                        }
                    });
                    var tempObj = {
                        url:CONFIG.entirety,
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
            return entiretyModel;
        }
    ]);
})(app);