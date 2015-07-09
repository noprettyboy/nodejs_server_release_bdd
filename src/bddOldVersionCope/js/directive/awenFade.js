/**
 * @file: awenFade
 * @author: wenghanyi
 */
var app = app;
app.directive('awenFade',
    function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$render = function () {
                    if (ngModel.$viewValue) {
                        element.fadeIn('slow');
                    }
                    else {
                        element.fadeOut('slow');
                    }
                };
            }
        };
    }
);
