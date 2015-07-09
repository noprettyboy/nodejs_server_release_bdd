/**
 * Created by zhangzengwei on 2015/4/24.
 */
var app = angular.module('cae-monitor', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../../html/_entirety.html',
            controller: 'entiretyController'
        })
        .when('/entirety', {
            templateUrl: '../../html/_entirety.html',
            controller: 'entiretyController'
        })
        .when('/monitor/:productId', {
            templateUrl: '../../html/_monitor.html',
            controller: 'monitorController'
        })
        .when('/monitor/:productId/add', {
            templateUrl: '../../html/_monitorAdd.html',
            controller: 'monitorAddController'
        })
        .when('/monitor/:productId/edit/:monitorId', {
            templateUrl: '../../html/_monitorEdit.html',
            controller: 'monitorEditController'
        })
        .when('/alarm/:productId', {
            templateUrl: '../../html/_alarm.html',
            controller: 'alarmController'
        })
        .when('/alarm/resolve/:productId/:alarmId', {
            templateUrl: '../../html/_alarmResolve.html',
            controller: 'alarmResolveController'
        })
        .when('/alarm/batchResolve/:productId/:alarmId', {
            templateUrl: '../../html/_alarmBatchResolve.html',
            controller: 'alarmBatchResolveController'
        })
        .when('/analysis', {
            templateUrl: '../../html/_analysis.html',
            controller: 'analysisController'
        })
        // .when('/display/:productId', {
        //     templateUrl: '../../html/_display.html',
        //     controller:  'displayController'
        // })
        .when('/online/pvClick/1', {
            templateUrl: '../../html/_onlinePvClickPl.html',
            controller: 'onlinePvClickPlController'
        })
        .when('/beforeOnline/pvClick/:productId', {
            templateUrl: '../../html/_beforeOnlinePvClick.html',
            controller: 'beforeOnlinePvClickController'
        })
        .when('/pvClick/dayLevel/:productId', {
            templateUrl: function (params) {
                switch (params.productId) {
                    case '8' : return '../../html/_pvClickDayLevel.html';
                    case '16' : return '../../html/_pvClickZSYXCPCDayLevel.html';
                }
            }
            // controller: function ($routeParams) {
            //     console.log($routeParams);
            //     switch ($routeParams.productId) {

            //         case '8' : console.log('in');return 'pvClickDayLevelController';
            //     }
            // }
            // templateUrl: '../../html/_pvClickDayLevel.html',
            // controller: 'pvClickDayLevelController'
        })
        .when('/permission', {
            templateUrl: '../../html/_permission.html',
            controller: 'permissionController'
        })
        .when('/dashboard/TBD', {
            templateUrl: '../../html/_dashboardTBD.html',
            controller: 'dashboardTBDController'
        })
        // .when('/permission/:backLoc', {
        //     templateUrl: '../../html/_permission.html',
        //     controller: 'permissionController'
        // })
        // .when('/detailView', {
        //     templateUrl: '../../html/_detailView.html',
        //     controller: 'DetailViewController'
        // })
        //  .when('/:pageName', {
        //      templateUrl: '../../html/_detailView.html',
        //      controller: 'DetailViewController'
        //  })
        //  .when('/:pageName/:productId', {
        //      templateUrl: '../../html/_detailView.html',
        //      controller: 'DetailViewController'
        //  })
        //  .when('/:pageName/:productId/:detailID', {
        //      templateUrl: '../../html/_detailView.html',
        //      controller: 'DetailViewController'
        //  })
        // .when('alarmResolve/productId=:productId/alarmId=:alarmId',{
        //     templateUrl: '../../html/_alarmResolve.html',
        //     controller: 'AlarmResolveController'
        // })
        .otherwise({
            redirectTo: '/dashboard/TBD'
        });
});


app.run(['$route', '$rootScope', '$location', function ($route, $rootScope, $location) {
    var original = $location.path;
    $location.path = function (path, reload) {
        if (reload === false) {
            var lastRoute = $route.current;
            var un = $rootScope.$on('$locationChangeSuccess', function () {
                $route.current = lastRoute;
                un();
            });
        }

        return original.apply($location, [path]);
    };
}]);
app.directive('ngRightClick', function($parse) {  
    return function(scope, element, attrs) {  
        var fn = $parse(attrs.ngRightClick);  
        element.bind('contextmenu', function(event) {  
            scope.$apply(function() {  
                event.preventDefault();  
                fn(scope, {$event:event});  
            });  
        });  
    };  
});




