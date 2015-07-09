/**
 * Created by zhangzengwei on 2015/4/28.
 */
 /* globals app */
app.controller('entiretyController', ['$scope', '$routeParams', '$location', '$compile', 'entiretyModel',
    function ($scope, $routeParams, $location, $compile, entiretyModel) {
        pageInit();

        function pageInit() {
            // $('[data-toggle="popover"]').popover({trigger: 'hover'});
            // $("#example").popover();
            window.onresize = resizeWidth;
            var curBrowserHeight = $(window).height();
            function resizeWidth() {
                curBrowserHeight = $(window).height();
                $('div.nav-menu div.sub-nav').css('left', $('div.nav-menu li[name=display]').offset().left - 26);
            }
            resizeWidth();

            $('div#header ul.nav li').removeClass('current-li');
            $('div#header ul.nav li[name=entirety]').addClass('current-li');

            $scope.entiretyModel = new entiretyModel();
            loadEntireMonitorData();
        }

        function loadEntireMonitorData () {
            var params = {};
            $scope.entiretyModel.getEntireMonitorStatus(params,function(result){
                if(result.success){
                    $scope.loadEntiretyData = result.data.productStatusDates;
                    console.log(result);
                    setTimeout(function(){
                        $('[data-toggle="popover"]').popover(
                            {
                                trigger: 'hover',
                                placement: 'top',
                                html: 'html'
                            }
                        );
                    }, 100);
                }
            });
        }

		function getColorByScore(score){
            if ( score == 100 ) {
               return '#1abc9c';
            }
            if ( score >= 50 && score < 100) {
               return '#3498db';
            }
            if (score < 50 && score >= 0) {
                return '#f0776c';
            }
        }

        $scope.intoProduct = function (productId) {
            $location.path('/alarm/' + productId, true);
        };
    }
]);