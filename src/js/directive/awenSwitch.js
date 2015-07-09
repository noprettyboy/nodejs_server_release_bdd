/**
 * @file: awenSwitch, wrap bootstrap-switch into angular world (directive)
 * @author: wenghanyi
 */
app.directive('awenSwitch', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A',
            require:  'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }

                ngModel.$render = function () {
                    element.bootstrapSwitch('state', ngModel.$viewValue, true);
                };

                element.bootstrapSwitch({
                    state:   true,
                    size:    'mini',
                    onText:  '&radic;',
                    offText: 'x',
                    onSwitchChange: function (e, status) {
                        $timeout(function () {
                            scope.$apply(function () {
                                ngModel.$setViewValue(status);
                            });
                        });
                    }
                });
            }
        };
    }
]);