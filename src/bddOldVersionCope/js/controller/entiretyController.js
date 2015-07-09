/**
 * Created by zhangzengwei on 2015/4/28.
 */
app.controller('entiretyController', ['$scope', '$routeParams', '$location', 'entiretyModel',
    function($scope, $routeParams, $location, entiretyModel) {
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
                    // $('[data-toggle="tooltip"]').tooltip({trigger : 'hover'});
                    // $('[data-toggle="popover"]').popover({trigger: 'hover'});
                    console.log(result);
                    setTimeout(function(){
                        $('[data-toggle="popover"]').popover(
                            {
                                trigger: 'hover', 
                                placement: 'top', 
                                html: 'html'
                            }
                        );
                        // $('.product-status-item-div').popover({trigger: 'hover'});
                    //     if(result.data.productStatusDates.length > 0) {
                    //         for(var i = 0 ; i < result.data.productStatusDates.length ; i++) {
                    //             var productId = result.data.productStatusDates[i].productId;
                    //             var score = result.data.productStatusDates[i].score;
                    //             $('#yyy_score' + productId).css({'border' : 'solid 1px '+getColorByScore(score), 'background-color': getColorByScore(score)});
                    //             $('#xxx_info' + productId).css({'border' : 'solid 1px #bbbbbb', 'color': '#bbbbbb'});
                    //         }

                    //         $('.xxx div a').mouseover(function(){
                    //             var score =$(this).attr('score');
                    //             var productName = $(this).attr('name');
                    //             var p0Count = $(this).attr('p0Count');
                    //             var p1Count = $(this).attr('p1Count');
                    //             var p2Count = $(this).attr('p2Count');
                    //             var text = productName + '<br>P0报警:' + p0Count+',p1报警:' + p1Count+',p2报警:' + p2Count;
                    //             $(this).html(text);
                    //         });
                    //         $('.xxx div a').mouseout(function(){
                    //             var score =$(this).attr('score');
                    //             var productName = $(this).attr('name');
                    //             $(this).text(productName);
                    //         });
                    //     }
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
    }
]);