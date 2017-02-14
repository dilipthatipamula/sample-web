app.directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                    //scope.$eval(attrs.ngEnter || attrs.ngClick, {$event:event});
                });

                event.preventDefault();
            }
        });
    };
});

app.filter('trustAsHTML', ['$sce', function($sce) {
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

// =========================================================================
// Dynamic table
// =========================================================================
app.directive("dynamicTable", ['$state', '$filter', '$rootScope', function($state, $filter, $rootScope) {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'views/common/layout/table.html',
        scope: {
            schema: '=',
            records: '=',
            summary: '=',
            enums: '=',
            sortfield: '=',
            sortorder: '=',
            sortFn: '&',
            sorttype: '=',
            selected: '=',
            updateFn: '&',
            deleteFn: '&',
            hideSummary: '=',
            openEditModal: '&',
            format: '&',
            loader: '='
        },
        link: function(scope, elem, attrs) {
            scope.editorInfo = {}
            scope.header = {
                allchecked: false
            }
            scope.toggleAll = function() {
                scope.beforeSortable = true;
                scope.selected = [];
                angular.forEach(scope.records, function(record, $index) {
                    record.isChecked = scope.header.allchecked;
                    if (scope.header.allchecked) {
                        scope.selected.push(record[scope.schema.idField])
                    }
                });
                if (scope.selected.length > 0) {
                    scope.$root.disable = false;
                } else {
                    scope.$root.disable = true;
                }
                $rootScope.$emit('NOTIF_CHECK', { message: "Checkbox state changed" });
            }
            scope.toggle = function(record) {
                var checkAll = true;
                angular.forEach(scope.records, function(record, $index) {
                    if (checkAll && !record.isChecked) {
                        checkAll = false;
                    }
                });
                scope.header.allchecked = checkAll;
                if (record.isChecked) {
                    scope.selected.push(record[scope.schema.idField])
                } else {
                    _.pull(scope.selected, record[scope.schema.idField])
                }
                if (scope.selected.length > 0) {
                    scope.$root.disable = false;
                } else {
                    scope.$root.disable = true;
                }
                $rootScope.$broadcast('NOTIF_CHECK', { message: "Checkbox state changed" });
            }
            scope.initSort = function(field) {
                if (field.defaultSort) {
                    scope.sortfield = field.field
                    scope.sortorder = false
                }
            }
            scope.sort = function(fieldName) {
                scope.beforeSortable = false;
                if (scope.sortfield === fieldName) {
                    scope.sortorder = !scope.sortorder
                } else {
                    scope.sortfield = fieldName
                    scope.sortorder = false;
                }
                if (scope.sorttype) {
                    var data = { field: fieldName, order: scope.sortorder }
                    scope.sortFn({ data: data });
                } else {
                    scope.records = $filter('orderBy')(scope.records, fieldName, scope.sortorder)
                }
            }
            scope.linkParams = function(field, record) {
                if (!field.linkParams) {
                    return $state.params;
                }
                var obj = {}
                angular.forEach(field.linkParams, function(item) {
                    obj[item.name] = record[item.valueField]
                })
                return _.merge($state.params, obj);
            }
            scope.editRow = function(record) {
                scope.openEditModal({
                    "record": record
                })
            }
            scope.formatFields = function(field, record) {
                return scope.format({
                    'field': field,
                    'record': record
                });
            }
            scope.handleChange = function(field, record, val) {
                scope.$parent[field.fn](field, record, val);
            }

            scope.toggleDetail = function($index, record) {
                record.expand = !record.expand;
                scope.activePosition = scope.activePosition == $index ? -1 : $index;
            };
            scope.sendEvent = function(event, record, parentIndex, field) {
                record.field = field;
                scope.$emit(event, record, parentIndex);
            }
        }
    }
}])
