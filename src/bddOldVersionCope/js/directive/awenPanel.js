/**
 * @file: awenPanel
 * @author: wenghanyi
 */
var app = app;
app.directive('awenPanel',
    function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            template: '<div>'
                + '<div class="btn btn-default role-header"></div>'
                + '<div class="role-body" ng-transclude></div>'
                + '</div>',
            link: function (scope, element, attrs) {
                var title = element.children().eq(0);
                var body  = element.children().eq(1);
                title.html(attrs.title + '<span style="float:right">▼</span>')
                    .addClass(attrs.adClass)
                    .click(function () {
                        body.toggle('slow');
                    }
                );
                if (attrs.collapse && attrs.collapse === 'collapse') {
                    body.addClass('role-hide');
                }
                /*
                 if (attrs.hide && attrs.hide === 'hide') {
                 element.addClass('role-hide');
                 }
                 */
            }
        };
    }
);

