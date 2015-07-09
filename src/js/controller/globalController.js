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

        /* globals globalProductsArr */
        globalProductsArr = [
            {
                id: 1,
                name: 'KA品专',
                pn: 'kapinzhuan'
            },
            {
                id: 2,
                name: '中小品专',
                pn: 'zxpinzhuan'
            },
            {
                id: 3,
                name: '品牌华表',
                pn: 'pphuabiao'
            },
            {
                id: 4,
                name: '品牌起跑线',
                pn: 'ppqipaoxian'
            },
            {
                id: 16,
                name: '知识营销cpc',
                pn: 'zsyingxiaocpc'
            },
            {
                id: 5,
                name: '知识营销cpt',
                pn: 'zsyingxiaocpc'
            },
            {
                id: 6,
                name: '图腾',
                pn: 'zsyingxiaocpt'
            },
            {
                id: 7,
                name: '问答营销',
                pn: 'wtyingxiao'
            },
            {
                id: 8,
                name: '企业百科',
                pn: 'baike'
            },
            {
                id: 9,
                name: '后裔检索',
                pn: 'houyijs'
            },
            {
                id: 10,
                name: '商业阿拉丁检索',
                pn: 'aladingjs'
            },
            {
                id: 11,
                name: '知识营销cpc检索',
                pn: 'zsyingxiaocpcjs'
            },
            {
                id: 18,
                name: '知识营销cpt检索',
                pn: 'zsyingxiaocptjs'
            },
            {
                id: 12,
                name: '图+检索',
                pn: 'tujiajs'
            },
            {
                id: 13,
                name: '智能品专检索',
                pn: 'znpinzhuanjs'
            },
            {
                id: 14,
                name: '商业阿拉丁',
                pn: 'syalading'
            },
            {
                id: 15,
                name: '智能品专',
                pn: 'znpinzhuan'
            },
            {
                id: 17,
                name: '百度知识',
                pn: 'bdzhishi'
            },
            {
                id: 19,
                name: 'rcv2检索',
                pn: 'rcv2js'
            },
            {
                id: 20,
                name: '报价工具核心模块',
                pn: 'bjgjhexinmokuai'
            },
            {
                id: 21,
                name: '策略端',
                pn: 'celvduan'
            }
        ];
        /* globals globalDayLevelOpenProductsArr */
        globalDayLevelOpenProductsArr = [8, 16];
     }
]);


