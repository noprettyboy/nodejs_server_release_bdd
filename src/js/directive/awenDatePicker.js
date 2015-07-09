 /**
 * @file: awenDateTimePicker, wrap JQuery DateTimePicker UI into angular world (directive)
 * @author: wenghanyi
 */
var app = app;
app.directive('awenDatePicker',
    function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }

                ngModel.$render = function () {
                    element.datetimepicker({value: ngModel.$viewValue});
                };

                var d = element.datetimepicker({
                    timepicker: false,
                    mask: true,
                    format: 'Y-m-d',
                    onSelectDate: function (curTime) {
                        scope.$apply(function () {
                            ngModel.$setViewValue(curTime.format('yyyy-MM-dd'));
                        });
                    }
                });
            }
        };
    }
);
