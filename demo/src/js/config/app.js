var app = angular.module('DQC', ['ngRoute']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../../html/_index.html',
            controller: 'IndexController'
        })
        .when('/index', {
            templateUrl: '../../html/_index.html',
            controller: 'IndexController'
        })      
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





