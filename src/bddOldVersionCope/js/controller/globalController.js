/**
 * @file
 * Created by zhangzengwei on 2015/4/28.
 */
app.controller('globalController', ['$scope', '$routeParams', '$location', 'globalModel',
    function ($scope, $routeParams, $location, globalModel) {
        window.onresize = resizepx;
        var curBrowserHeight = $(window).height();
        function resizepx() {
            curBrowserHeight = $(window).height();
            $('body div.loading-div').css('height', curBrowserHeight);
            $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight / 2 - 150);

            $('body div.waiting').css('height', curBrowserHeight);
            $('body div.waiting > div').css('margin-top', curBrowserHeight / 2 - 50);
        }
        resizepx();

        $('div#header ul.nav li').removeClass('current-li');
        if (/^$/.test($location.$$path) || /^\/$/.test($location.$$path) || /^\/entirety/.test($location.$$path)) {
            $('div#header ul.nav li[name=entirety]').addClass('current-li');
        } else if (/^\/monitor/.test($location.$$path)) {
            $('div#header ul.nav li[name=monitor]').addClass('current-li');
        } else if (/^\/alarm/.test($location.$$path)) {
            $('div#header ul.nav li[name=alarm]').addClass('current-li');
        } else if (/^\/display/.test($location.$$path)) {
            $('div#header ul.nav li[name=display]').addClass('current-li');
        }

        $scope.switchPage = function (pageName,event) {
            if (pageName === 'permission') {
                $location.path('/' + pageName, true);
                return;
            } else if (pageName === 'display') {
                if ($('div.nav-menu div.sub-nav').is(":visible")) {
                    $('div.nav-menu div.sub-nav').removeClass('sub-nav-show');
                } else {
                    $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
                    $('div.nav-menu div.sub-nav').addClass('sub-nav-show');
                }
                return;
            } else {
                $('div.nav-menu div.sub-nav').removeClass('sub-nav-show');
                var curProductId = $routeParams.productId ? $routeParams.productId : 1;
                (pageName === 'entirety' || pageName === 'analysis') ? $location.path('/' + pageName, true) :
                    ((pageName === 'monitor') ?
                        $location.path('/' + pageName + '/' + curProductId, true) :
                        $location.path('/' + pageName + '/' + curProductId, true));
                    /*
                                 (pageName === 'monitor' ? $location.path('/' + pageName + '/' + curProductId, true) :
                                     $location.path('/' + pageName + '/' + curProductId + '/1', true));
                                     */
            }
        };
        $scope.switchDisplayPage = function (displayPageName, event) {
            var curProductId = $routeParams.productId;
            if (displayPageName === 'pvClick/dayLevel') {
                $location.path('/' + displayPageName + '/8', true);
                // if (curProductId === undefined) {
                //     $location.path('/' + displayPageName + '/8', true);
                // } else {
                //     $location.path('/' + displayPageName + '/' + curProductId, true);
                // }
            } else if (displayPageName === 'beforeOnline/pvClick') {
                $location.path('/' + displayPageName + '/12', true);
                // if (curProductId === undefined) {
                //     $location.path('/' + displayPageName + '/1', true);
                // } else {
                //     $location.path('/' + displayPageName + '/' + curProductId, true);
                // }
            } else {
                $location.path('/' + displayPageName + '/1', true);
                // if (curProductId === undefined) {
                //     $location.path('/' + displayPageName + '/1', true);
                // } else {
                //     $location.path('/' + displayPageName + '/' + curProductId, true);
                // }
            }
        }

        $scope.globalModel = new globalModel();
        var params = {};
        $scope.globalModel.getUserInfo(params, function (result) {
            if(result.success) {
                $scope.userInfo = result.data;
            }
        });
     }
]);


