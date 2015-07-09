/**
 * @file: httpTemplate
 * @author: wenghanyi
 */

app.factory('httpTemplate', ['$http', '$q',
    function ($http, $q) {
        return function (method, url, params, cb, err) {
            var deferred = $q.defer();

            $('.waiting').css({display: 'block'});

            // FIXME: for POST/PUT/DELETE method, shoud assign config.data rather than config.param !
            $http({
                url    : url,
                params : params,
                method : method
            }).success(function (res) {

                $('.waiting').css({display: 'none'});

                if (res.success) {
                    if (method === 'POST' || method === 'DELETE') {
                        $('.common-alert-dialog .modal-body').text('请求处理成功！');
                        $('.common-alert-dialog').modal('show');
                    }
                    if (cb) {
                        cb(res);
                    }
                    deferred.resolve();
                }
                else {
                    if (!res.message || res.message == "") {
                        $('.common-alert-dialog .modal-body').text('请求后台数据错误！');
                    }
                    else {
                        $('.common-alert-dialog .modal-body').text(res.message);
                        $('.common-alert-dialog').modal('show');
                        if (err) {
                            err(res.message);
                        }
                    }
                }

            }).error(function () {

                $('.waiting').css({display: 'none'});

                if (err)
                    err("Fail to get response");

                $('.common-alert-dialog .modal-body').text('请求后台数据失败!');
                $('.common-alert-dialog').modal('show');
            });

            return deferred.promise;
        };
    }
]);
