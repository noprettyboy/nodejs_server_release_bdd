/**
 * @file: dashboardTbd
 * @author: wenghanyi
 */
var app = app;
app.controller('dashboardTBDController', ['$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {

        $('div#header ul.nav li').removeClass('current-li');
        $('div#header ul.nav li[name=dashboard]').addClass('current-li');

        window.onresize = resizeWidth;
        var curBrowserHeight = $(window).height();
        function resizeWidth() {
            curBrowserHeight = $(window).height();
            $('div#container div.tree-div').css('height', curBrowserHeight - 120);
            $('body div.loading-div').css('height', curBrowserHeight);
            $('body div.loading-div .loading-div-inner').css('margin-top', curBrowserHeight / 2 - 150);
        }
        resizeWidth();

        var imgPath   = 'img/expecting.png';
        var expecting = new Image();
        expecting.onload = function () {
            var expectImg = $('<img>', {
                src: imgPath
            });
            expectImg.appendTo('.monitor-content');

            var self = this;
            function setImgPos() {
                var width  = self.width;
                var height = self.height;

                var containerSize = {
                    w: $('#monitor').width(),
                    h: $('#monitor').height()
                };

                var margin = {x: 0, y: 0};
                if (self.width <= containerSize.w) {
                    margin.x = (containerSize.w - self.width) / 2;
                }
                else {
                    width = containerSize.w;
                }

                if (self.height <= containerSize.h) {
                    margin.y = (containerSize.y - self.height) / 2;
                }
                else {
                    height = containerSize.h;
                }

                expectImg.width(width);
                expectImg.height(height);
                expectImg.css({
                    marginTop: margin.y,
                    marginBottom: margin.y,
                    marginLeft: margin.x,
                    marginRight: margin.x
                });
            }
            setImgPos();
            window.addEventListener('resize', setImgPos, false);
        };
        expecting.src = imgPath;


        $scope.switchProduct = function ()
        {
            if (event.target.tagName === 'LI') {
                $location.path('/dashboard/' + $(event.target).val(), true);
            } else if (event.target.tagName === 'SPAN') {
                $location.path('/dashboard/' + $(event.target).parent().val(), true);
            }
        };
    }
]);
