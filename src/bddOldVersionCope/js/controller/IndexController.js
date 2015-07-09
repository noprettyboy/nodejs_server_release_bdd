
app.controller('IndexController', ['$scope', '$routeParams', '$location', 'indexTask',
    function($scope, $routeParams, $location, indexTask) {
        $location.path("/index", true);

        $scope.indexTask = new indexTask();
        // get the statistic data for index page
        var params = {};
        $scope.indexTask.load(params, function(json){
            if (json.success) {
                var newTaskArr = [];
                var tempArr = [];
                $.each(json.data.tasks, function (i, item) {
                    if ((i+1)%3==0) {
                        tempArr.push(item);
                        newTaskArr.push(tempArr);
                        tempArr = [];
                    } else {
                        tempArr.push(item);
                        if (i == (json.data.tasks.length-1)) {
                            newTaskArr.push(tempArr);
                            tempArr = [];
                        }
                    }
                });
                $scope.indexTaskInfo = newTaskArr;
                newTaskArr = null;

                var curBrowserWidth = document.body.clientWidth;
                var curContentWidth = $scope.indexTaskInfo.length*200 + 200;
                responseMouseOver(curBrowserWidth, curContentWidth);                              
            }
        });
        // response the mouseOver action to change the width and position 
        function responseMouseOver (curBrowserWidth, curContentWidth) {
            var curBrowserWidth = curBrowserWidth;
            var curContentWidth = curContentWidth;               
            if (curContentWidth > curBrowserWidth) { 
                var curBrowserMid = curBrowserWidth/2;      
                var widthPeriod = curBrowserWidth - curContentWidth;

                $("div.content").attr("style", "width:"+curContentWidth+"px;left:"+widthPeriod/2 + "px");

                $("div#index_content").on("mouseover", function (e) {            
                    if (e.pageX > curBrowserMid) {
                        var movePercent = (e.pageX-curBrowserMid)/curBrowserMid;
                        var moveValue = movePercent*((curContentWidth/2)-(curBrowserWidth/2));                
                        $("div.content").attr("style", "width:"+curContentWidth+"px;left:"+widthPeriod/2+"px;transform:translate(-"+moveValue+"px, 0px);-moz-transform:translate(-"+moveValue+"px, 0px);");
                    } else {
                        var movePercent = (curBrowserMid-e.pageX)/curBrowserMid;
                        var moveValue = movePercent*((curContentWidth/2)-(curBrowserWidth/2));
                        $("div.content").attr("style", "width:"+curContentWidth+"px;left:"+widthPeriod/2+"px;transform:translate("+moveValue+"px, 0px);-moz-transform:translate("+moveValue+"px, 0px);");
                    }
                });
            } else {
                $("div.content").attr("style", "width:"+curContentWidth+"px;");
            }
        }
        // response the browser resize
        window.onresize=resizeWidth;
        function resizeWidth(){
            var curBrowserWidth = document.body.clientWidth;
            var curContentWidth = $scope.indexTaskInfo.length*200 + 200;
            responseMouseOver(curBrowserWidth, curContentWidth);
        }

    }
]);
