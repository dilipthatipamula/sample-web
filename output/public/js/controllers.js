var app = angular.module('app', [
    'ngAnimate',
    'ui.router',
    'ui.bootstrap',
    'ngStorage',
    'templates',
    'nya.bootstrap.select',
    'angular-loading-bar',
    'ui-notification',
    'ui.bootstrap.datetimepicker'
])

app.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])

app
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/login");


        $stateProvider

        //------------------------------
        // HOME
        //------------------------------

            .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/list.html',
            controller: 'dashboardCtrl'
        })

    })

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

app

//==============================================
// Auth Interceptor
//==============================================

    .config(function($httpProvider) {
    $httpProvider.interceptors.push('apiInterceptor');
})

.service('apiInterceptor', ['$rootScope', 'sessionService', '$location', function($rootScope, sessionService, $location) {
    this.request = function(config) {
        if (!$rootScope.$storage.currentUser) {
            $location.path('/dashboard');
        }
        if (config.headers.Authorization) {} else if (angular.isDefined($rootScope.$storage.token)) {
            config.headers.Authorization = 'Token ' + $rootScope.$storage.token
        }
        if (angular.isDefined($rootScope.$storage.companyID)) {
            config.headers.companyID = $rootScope.$storage.companyID
        }
        if (config.headers.NoHeader)
            config.headers = {};

        return config;
    };

    this.responseError = function(response) {
        return response;
    };
}])

app
    .constant('pageConfig', {
        "pages": [
        ]
    })

var schemaDefs = {
    "tasks": {
        "idField": "id",
        "fields": [{
            "field": "type",
            "label": "Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "status",
            "label": "Status",
            "type": "field",
            "sortable": false
        }, {
            "field": "duedate",
            "label": "Queued Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false
        }, {
            "field": "startdate",
            "label": "Start Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false,
        }, {
            "field": "enddate",
            "label": "Complete Date",
            "type": "date",
            "dateFormat": "MM/dd/yyyy hh:mm:ss",
            "sortable": false,
        }, {
            "field": "timeTaken",
            "label": "Time Taken(HH:MM:SS)",
            "type": "field",
            "sortable": false
        }, {
            "field": "message",
            "label": "Message",
            "type": "field",
            "sortable": false
        }]
    },
    "templates": {
        "idField": "id",
        "fields": [{
            "field": "name",
            "label": "Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "type",
            "label": "Format",
            "type": "field",
            "sortable": false
        }, {
            "field": "createdAt",
            "label": "Created At",
            "type": "date",
            "dateFormat": "MM/dd/yyyy",
            "sortable": false
        }, {
            "field": "updatedAt",
            "label": "Updated At",
            "type": "date",
            "dateFormat": "MM/dd/yyyy",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "template-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "schedules": {
        "idField": "id",
        "fields": [{
            "field": "priority",
            "label": "Priority",
            "type": "field",
            "sortable": false
        }, {
            "field": "msgType",
            "label": "Message Type",
            "type": "field",
            "sortable": false
        }, {
            "field": "criteria.ACCOUNT_NUMBER",
            "label": "Counterparty",
            "type": "format",
            "sortable": false
        }, {
            "field": "templateName",
            "label": "Template",
            "type": "field",
            "sortable": false
        }, {
            "field": "timeline.type",
            "label": "Timeline",
            "type": "format",
            "sortable": false
        }, {
            "field": "delivery.mode",
            "label": "Transmission Mode",
            "type": "format",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "schedule-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "ftps": {
        "idField": "id",
        "fields": [{
            "field": "name",
            "label": "FTP Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "user",
            "label": "User Name",
            "type": "field",
            "sortable": false
        }, {
            "field": "ACCOUNT_NUMBER",
            "label": "Account Number",
            "type": "field",
            "sortable": false
        }, {
            "field": "ip",
            "label": "IP Address",
            "type": "field",
            "sortable": false
        }, {
            "field": "dir",
            "label": "Directory",
            "type": "field",
            "sortable": false
        }, {
            "field": "",
            "label": "",
            "type": "actions",
            "actionType": "custom",
            "sortable": false,
            "templateURL": "ftps-actions-url",
            "style": "left",
            "actions": []
        }]
    },
    "STMT": {
      "fields": [{
          "label": "Client Name",
          "key": "CLIENT_NAME",
          "type": "string"
      },{
          "label": "Client Account",
          "key": "CLIENT_ACCOUNT_NAME",
          "type": "string"
      },{
          "label": "Trade Reference",
          "key": "TRADE_REF",
          "type": "string"
      },{
          "label": "Account Number",
          "key": "ACCOUNT_NUMBER",
          "type": "string"
      },{
          "label": "Trade Type",
          "key": "TRADE_TYPE",
          "type": "string"
      },{
          "label": "Company",
          "key": "COMPANY",
          "type": "string"
      },{
          "label": "Operation",
          "key": "OPER",
          "type": "string"
      },{
          "label": "Quantity",
          "key": "QUANTITY",
          "type": "string"
      },{
          "label": "Instrument Name",
          "key": "INSTR_NAME",
          "type": "string"
      },{
          "label": "Instrument Reference Type",
          "key": "INSTR_REF_TYPE",
          "type": "string"
      },{
          "label": "Instrument Reference",
          "key": "INSTR_REF",
          "type": "string"
      },{
          "label": "Maturity Date",
          "key": "MATURITY_DATE",
          "type": "date"
      },{
          "label": "Trade Date",
          "key": "TRADE_DATE",
          "type": "date"
      },{
          "label": "Settlement Date",
          "key": "SETTLE_DATE",
          "type": "date"
      },{
          "label": "Trade Price",
          "key": "TRADE_PRICE",
          "type": "string"
      },{
          "label": "Trade Principal",
          "key": "TRADE_PRINCIPAL",
          "type": "string"
      },{
          "label": "Trade Currency",
          "key": "TRADE_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest",
          "key": "ACCRUED_INTEREST",
          "type": "string"
      },{
          "label": "Accrued Interest Currency",
          "key": "ACCRUED_INTEREST_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest Days",
          "key": "ACCRUED_INTEREST_DAYS",
          "type": "string"
      },{
          "label": "Place of Trade",
          "key": "PLACE_OF_TRADE",
          "type": "string"
      },{
          "label": "Transfer Type",
          "key": "TRANSFER_TYPE",
          "type": "string"
      },{
          "label": "Broker Fee",
          "key": "BROKER_FEE",
          "type": "string"
      },{
          "label": "Clearing Fee",
          "key": "CLEARING_FEE",
          "type": "string"
      },{
          "label": "Exchange Fee",
          "key": "EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "SEC Fee",
          "key": "SEC_FEE",
          "type": "string"
      },{
          "label": "Commission",
          "key": "COMMISSION",
          "type": "string"
      },{
          "label": "CONS_TAX",
          "key": "Consumption Tax",
          "type": "string"
      },{
          "label": "STT Fee",
          "key": "STT_FEE",
          "type": "date"
      },{
          "label": "Net Broker Fee",
          "key": "NET_BROKER_FEE",
          "type": "string"
      },{
          "label": "Net Clearing Fee",
          "key": "NET_CLEARING_FEE",
          "type": "string"
      },{
          "label": "Net Exchange Fee",
          "key": "NET_EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "Net SEC Fee",
          "key": "NET_SEC_FEE",
          "type": "string"
      },{
          "label": "Net Commission",
          "key": "NET_COMMISSION",
          "type": "string"
      },{
          "label": "Net Consumption Tax",
          "key": "NET_CONS_TAX",
          "type": "date"
      },{
          "label": "Net STT Fee",
          "key": "NET_STT_FEE",
          "type": "string"
      },{
          "label": "Net Settlement Amount",
          "key": "NET_SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Amount",
          "key": "SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Currency",
          "key": "SETTLE_CCY",
          "type": "string"
      },{
          "label": "Settlement Type",
          "key": "SETTLE_TYPE",
          "type": "string"
      },{
          "label": "Company Bank Account Name",
          "key": "COMP_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account Name",
          "key": "CPTY_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account BIC",
          "key": "CPTY_BANK_ACC_BIC",
          "type": "string"
      },{
          "label": "Custody Account Name",
          "key": "CUSTODY_ACC_NAME",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "COMP_NAME",
          "type": "string"
      },{
          "label": "Company Address - Line 1",
          "key": "COMP_ADDR1",
          "type": "string"
      },{
          "label": "Company Address - Line 2",
          "key": "COMP_ADDR2",
          "type": "string"
      },{
          "label": "Company Address - Line 3",
          "key": "COMP_ADDR3",
          "type": "string"
      },{
          "label": "Company Address - City",
          "key": "COMP_CITY",
          "type": "string"
      },{
          "label": "Company Address - State",
          "key": "COMP_STATE",
          "type": "string"
      },{
          "label": "Company Address - Country",
          "key": "COMP_COUNTRY",
          "type": "string"
      },{
          "label": "Company Address - Zip Code",
          "key": "COMP_ZIP",
          "type": "string"
      },{
          "label": "Company E-Mail Id",
          "key": "COMP_EMAIL",
          "type": "string"
      },{
          "label": "Company Fax No",
          "key": "COMP_FAX",
          "type": "string"
      },{
          "label": "Company Address - Telephone No",
          "key": "COMP_PHONE",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "CLIENT_ADDR_NAME",
          "type": "string"
      },{
          "label": "Client Address - Line 1",
          "key": "CLIENT_ADDR1",
          "type": "string"
      },{
          "label": "Client Address - Line 2",
          "key": "CLIENT_ADDR2",
          "type": "string"
      },{
          "label": "Client Address - Line 3",
          "key": "CLIENT_ADDR3",
          "type": "string"
      },{
          "label": "Client Address - City",
          "key": "CLIENT_CITY",
          "type": "string"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      },{
          "label": "Client E-Mail Id",
          "key": "CLIENT_EMAIL",
          "type": "string"
      },{
          "label": "Client Fax No",
          "key": "CLIENT_FAX",
          "type": "string"
      },{
          "label": "Client Address - Telephone No",
          "key": "CLIENT_PHONE",
          "type": "string"
      },{
          "label": "Report",
          "key": "PDF_LINK",
          "type": "link"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      }]
    },
    "TRADE": {
      "fields": [{
          "label": "Client Name",
          "key": "CLIENT_NAME",
          "type": "string"
      },{
          "label": "Client Account",
          "key": "CLIENT_ACCOUNT_NAME",
          "type": "string"
      },{
          "label": "Trade Reference",
          "key": "TRADE_REF",
          "type": "string"
      },{
          "label": "Account Number",
          "key": "ACCOUNT_NUMBER",
          "type": "string"
      },{
          "label": "Trade Type",
          "key": "TRADE_TYPE",
          "type": "string"
      },{
          "label": "Company",
          "key": "COMPANY",
          "type": "string"
      },{
          "label": "Operation",
          "key": "OPER",
          "type": "string"
      },{
          "label": "Quantity",
          "key": "QUANTITY",
          "type": "string"
      },{
          "label": "Instrument Name",
          "key": "INSTR_NAME",
          "type": "string"
      },{
          "label": "Instrument Reference Type",
          "key": "INSTR_REF_TYPE",
          "type": "string"
      },{
          "label": "Instrument Reference",
          "key": "INSTR_REF",
          "type": "string"
      },{
          "label": "Maturity Date",
          "key": "MATURITY_DATE",
          "type": "date"
      },{
          "label": "Trade Date",
          "key": "TRADE_DATE",
          "type": "date"
      },{
          "label": "Settlement Date",
          "key": "SETTLE_DATE",
          "type": "date"
      },{
          "label": "Trade Price",
          "key": "TRADE_PRICE",
          "type": "string"
      },{
          "label": "Trade Principal",
          "key": "TRADE_PRINCIPAL",
          "type": "string"
      },{
          "label": "Trade Currency",
          "key": "TRADE_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest",
          "key": "ACCRUED_INTEREST",
          "type": "string"
      },{
          "label": "Accrued Interest Currency",
          "key": "ACCRUED_INTEREST_CCY",
          "type": "string"
      },{
          "label": "Accrued Interest Days",
          "key": "ACCRUED_INTEREST_DAYS",
          "type": "string"
      },{
          "label": "Place of Trade",
          "key": "PLACE_OF_TRADE",
          "type": "string"
      },{
          "label": "Transfer Type",
          "key": "TRANSFER_TYPE",
          "type": "string"
      },{
          "label": "Broker Fee",
          "key": "BROKER_FEE",
          "type": "string"
      },{
          "label": "Clearing Fee",
          "key": "CLEARING_FEE",
          "type": "string"
      },{
          "label": "Exchange Fee",
          "key": "EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "SEC Fee",
          "key": "SEC_FEE",
          "type": "string"
      },{
          "label": "Commission",
          "key": "COMMISSION",
          "type": "string"
      },{
          "label": "CONS_TAX",
          "key": "Consumption Tax",
          "type": "string"
      },{
          "label": "STT Fee",
          "key": "STT_FEE",
          "type": "date"
      },{
          "label": "Net Broker Fee",
          "key": "NET_BROKER_FEE",
          "type": "string"
      },{
          "label": "Net Clearing Fee",
          "key": "NET_CLEARING_FEE",
          "type": "string"
      },{
          "label": "Net Exchange Fee",
          "key": "NET_EXCHANGE_FEE",
          "type": "string"
      },{
          "label": "Net SEC Fee",
          "key": "NET_SEC_FEE",
          "type": "string"
      },{
          "label": "Net Commission",
          "key": "NET_COMMISSION",
          "type": "string"
      },{
          "label": "Net Consumption Tax",
          "key": "NET_CONS_TAX",
          "type": "date"
      },{
          "label": "Net STT Fee",
          "key": "NET_STT_FEE",
          "type": "string"
      },{
          "label": "Net Settlement Amount",
          "key": "NET_SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Amount",
          "key": "SETTLE_AMT",
          "type": "string"
      },{
          "label": "Settlement Currency",
          "key": "SETTLE_CCY",
          "type": "string"
      },{
          "label": "Settlement Type",
          "key": "SETTLE_TYPE",
          "type": "string"
      },{
          "label": "Company Bank Account Name",
          "key": "COMP_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account Name",
          "key": "CPTY_BANK_ACC_NAME",
          "type": "string"
      },{
          "label": "Counterparty Bank Account BIC",
          "key": "CPTY_BANK_ACC_BIC",
          "type": "string"
      },{
          "label": "Custody Account Name",
          "key": "CUSTODY_ACC_NAME",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "COMP_NAME",
          "type": "string"
      },{
          "label": "Company Address - Line 1",
          "key": "COMP_ADDR1",
          "type": "string"
      },{
          "label": "Company Address - Line 2",
          "key": "COMP_ADDR2",
          "type": "string"
      },{
          "label": "Company Address - Line 3",
          "key": "COMP_ADDR3",
          "type": "string"
      },{
          "label": "Company Address - City",
          "key": "COMP_CITY",
          "type": "string"
      },{
          "label": "Company Address - State",
          "key": "COMP_STATE",
          "type": "string"
      },{
          "label": "Company Address - Country",
          "key": "COMP_COUNTRY",
          "type": "string"
      },{
          "label": "Company Address - Zip Code",
          "key": "COMP_ZIP",
          "type": "string"
      },{
          "label": "Company E-Mail Id",
          "key": "COMP_EMAIL",
          "type": "string"
      },{
          "label": "Company Fax No",
          "key": "COMP_FAX",
          "type": "string"
      },{
          "label": "Company Address - Telephone No",
          "key": "COMP_PHONE",
          "type": "string"
      },{
          "label": "Company Name",
          "key": "CLIENT_ADDR_NAME",
          "type": "string"
      },{
          "label": "Client Address - Line 1",
          "key": "CLIENT_ADDR1",
          "type": "string"
      },{
          "label": "Client Address - Line 2",
          "key": "CLIENT_ADDR2",
          "type": "string"
      },{
          "label": "Client Address - Line 3",
          "key": "CLIENT_ADDR3",
          "type": "string"
      },{
          "label": "Client Address - City",
          "key": "CLIENT_CITY",
          "type": "string"
      },{
          "label": "Client Address - State",
          "key": "CLIENT_STATE",
          "type": "string"
      },{
          "label": "Client Address - Country",
          "key": "CLIENT_COUNTRY",
          "type": "string"
      },{
          "label": "Client Address - Zip Code",
          "key": "CLIENT_ZIP",
          "type": "string"
      },{
          "label": "Client E-Mail Id",
          "key": "CLIENT_EMAIL",
          "type": "string"
      },{
          "label": "Client Fax No",
          "key": "CLIENT_FAX",
          "type": "string"
      },{
          "label": "Client Address - Telephone No",
          "key": "CLIENT_PHONE",
          "type": "string"
      },{
          "label": "Report",
          "key": "PDF_LINK",
          "type": "link"
      }]
    }
};

app

// =========================================================================
// Session Service
// =========================================================================

.service('sessionService', ['pageService', function(pageService) {
    this.create = function(data) {
        this.id = 100
        this.user = data.userInfo
        this.privileges = data.privileges
    };
    this.destroy = function() {
        this.id = null
        this.user = null
        this.privileges = null
    };
}])

// =========================================================================
//   Table Schema Service
//   =========================================================================

  .factory('schemaService', ['$http', function($http) {
      return {
          get: function(resource) {
              var myfields = schemaDefs[resource].fields;
              var retValue = _.pick(schemaDefs[resource], "idField");
              retValue.fields = myfields || []
              return retValue;
          }
      };
  }])


// =========================================================================
// Authenticate Service
// =========================================================================

.factory('authService', function($rootScope, $http, sessionService, pageService) {
    var authService = {};

    authService.login = function(credentials) {
        return $http({
                url: 'api/auth/myaccount/login',
                headers: makeHeaders(credentials),
                method: 'POST'
            })
            .success(function(data, status, headers, config) {
                if (data.status === 'success') {
                    sessionService.create(data)
                    $rootScope.$storage.companyID = data.companyID
                    $rootScope.$storage.token = data.token
                    $rootScope.$storage.currentUser = data
                }
            });

        function makeHeaders(credentials) {
            var base64Credentials = window.btoa(credentials.userName + ':' + credentials.password);
            var headers = new Object();
            headers.Authorization = 'Basic ' + base64Credentials;
            return headers;
        }
    };

    authService.logout = function() {
        sessionService.destroy()
        delete $rootScope.$storage.companyID
        delete $rootScope.$storage.token
        delete $rootScope.$storage.currentUser
        delete $rootScope.$storage.notifList
        delete $rootScope.$storage.notifCount
        delete $rootScope.$storage.selectedTab
        delete $rootScope.$storage.onClick
        $rootScope.$storage.pages = pageService.pages([])
    };

    authService.isAuthenticated = function() {
        return !!sessionService.user;
    };

    authService.isAuthorized = function(authorizedRoles) {
        //TODO: Complete this
        return true
    };

    return authService;
})

.factory('pageService', function(pageConfig) {
    var pageService = {}
    pageService.pages = function(privs) {
        return compute(privs)

        function compute(privs) {
            userPages = []
            pageConfig.pages.forEach(function(page) {
                if (page.priv === 'ALL') {
                    if (page.submenu) {
                        userPages.push(computeSubmenu(page, privs, userPages))
                    } else {
                        userPages.push(page)
                    }
                } else {
                    (privs || []).forEach(function(priv) {
                        if (priv.type === 'MODULE_ACCESS' && priv.name === page.priv) {
                            if (page.submenu) {
                                userPages.push(computeSubmenu(page, privs, userPages))
                            } else {
                                userPages.push(page)
                            }
                        }
                    })
                }
            })
            return userPages
        }

        function computeSubmenu(page, privs, userPages) {
            var newPage = angular.copy(page);
            var userSubmenu = [];
            (newPage.submenu || []).forEach(function(submenu) {
                (privs || []).forEach(function(priv) {
                    if (priv.type === 'MODULE_ACCESS' && priv.name === submenu.priv) {
                        userSubmenu.push(submenu)
                    }
                })
            })
            newPage.submenu = userSubmenu;
            return newPage;
        }

    };

    return pageService;

})

//
// .factory('configService', function($http, $rootScope) {
//     var configService = {};
//     configService.init = function() {
//         return $http({
//                 url: '/config',
//                 method: 'GET'
//             })
//             .success(function(data, status, headers, config) {
//                 $rootScope.config = data;
//             });
//     }
//     return configService;
// })
//
// .service('exists', function() {
//     var exists = {};
//     exists.method = function(array, obj) {
//         var isvalueExists = false;
//         _.each(array.rows, function(ch) {
//             if (ch.title == obj) {
//                 isvalueExists = true;
//                 return;
//             } else if (ch.code == obj) {
//                 isvalueExists = true;
//                 return;
//             }
//         });
//         return isvalueExists;
//     }
//     return exists;
// });

app
// =========================================================================
// Base controller for common functions
// =========================================================================
    .controller('mainCtrl', function($rootScope, $localStorage, $location) {
    $rootScope.$storage = $localStorage;
    $rootScope.format = "MM/dd/yyyy";
})

// =========================================================================
// Header
// =========================================================================
.controller('sidebarCtrl', function() {})

// =========================================================================
// Header
// =========================================================================
.controller('headerCtrl', function($scope, authService, $location, $rootScope) {
    $scope.doLogout = function() {
        authService.logout();
        $location.path('/login');
    }

    $scope.tabs = [{
        "name": "Dashboard",
        "url": "dashboard"
    }, {
        "name": "Trades",
        "url": "trades"
    }, {
        "name": "Schedules",
        "url": "schedules"
    }, {
        "name": "Templates",
        "url": "templates"
    }]

    $scope.onClickTab = function(sTab) {
        if (sTab == undefined) {
            var sTab='dashboard';
        }
        _.each($scope.tabs, function(tab) {
            tab.active = false
            if (tab.url === sTab) {
                tab.active = true
            }
        })
    };
    $scope.$on('SELECTED_TAB', function(event, data) {
        $scope.onClickTab(data);
    })
    $scope.setCurrentTab = function() {
        $scope.onClickTab($scope.getURL())
    }
    $scope.getURL = function() {
        return $location.path().split("/")[1]
    }
    $scope.setCurrentTab()
})

app.controller('dashboardCtrl', ['$scope', '$rootScope', '$http', '$filter', '$location', dashboardCtrl]);

function dashboardCtrl($scope, $rootScope, $http, $filter, $location) {
    $rootScope.$broadcast('SELECTED_TAB', 'dashboard');
    $scope.getFailedSummary = function() {
        $http({
            url: 'api/wf-api/failedsummary',
            method: 'GET'
        }).success(function(data, status, header, config) {
            $scope.summaryData = data.data
            // $scope.initFailedChart(data.data)
        })
    }
    $scope.getFailedSummary()

    $scope.getWeekSummary = function() {
        $http({
            url: 'api/wf-api/weeksummary',
            method: 'GET'
        }).success(function(data, status, header, config) {
            var weekData = data.data
            $scope.labels = getSortedDates(weekData)
            $scope.weekData = []
            $scope.legends = []
            _.each(weekData, function(item) {
               var temp = {
                   "name": item.status,
                   "stack": item.type,
                   "color" : $scope.getColor(item.status),
                   "data": getData(item.dates, item.data, item)
               }
               $scope.weekData.push($scope.enrichLegend(temp,item.status))
            })
            $scope.initWeekChart()
        })
    }
    $scope.getWeekSummary()

    $scope.enrichLegend = function(item,status){
      statusObj = {"status":status}
      var inLegend = _.find($scope.legends,statusObj)
      if (!inLegend){
        item.showInLegend = true
        $scope.legends.push(statusObj)
      }else{
        item.showInLegend = false
      }
      return item
    }

    function getSortedDates(data) {
        var dates = _.map(data, 'dates');
        dates = dates.reduce(function(a, b) {
            return a.concat(b);
        });
        dates = _.uniqBy(dates, function(e) {
            return e;
        });
        dates = _.sortBy(dates);
        return dates
    }

    $scope.colors = [{
        "status": "FAIL",
        "color": "red"
    }, {
        "status": "DONE",
        "color": "#008000"
    }, {
        "status": "NEW",
        "color": "#0000FF"
    }]

    function getData(dates, data, item) {
        var newData = []
        _.each($scope.labels, function(label, index) {
            if (_.indexOf(dates, label) == -1) {
                newData.push({
                    y: 0,
                    "type": item.type
                })
            } else {
                var val = data[_.indexOf(dates, label)]
                newData.push({
                    y: val,
                    "type": item.type,
                    "status": item.status,
                    // color: $scope.getColor(item.status)
                })
            }
        })
        return newData
    }

    $scope.getColor = function(status) {
        var temp = _.find($scope.colors, {
            "status": status
        })
        return temp.color
    }

    $scope.redirectToTrades = function(type, status,date) {
        window.location.href = "/#/trades?type=" + type + "&status=" + status + "&date="+date
    }

    $scope.initWeekChart = function() {
        Highcharts.chart('container-1', {
            chart: {
                type: 'column',
                backgroundColor: 'transparent'
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Activity'
            },

            xAxis: {
                categories: $scope.labels,
                title: {
                    text: 'Process Date',
                    y: 10
                }
            },

            yAxis: {
                allowDecimals: false,
                min: 0,
                title: {
                    text: 'Number of Trades'
                },
                stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                    },
                    formatter: function() {
                        return this.stack
                    }
                }
            },

            tooltip: {
                formatter: function() {
                    return '<b>Message type : ' + this.point.type + '</b><br/>' +
                        this.series.name + ': ' + this.y + '<br/>' +
                        'Total: ' + this.point.stackTotal;
                }
            },
            plotOptions: {
                column: {
                    stacking: 'normal',
                    dataLabels: {
                        enabled: true,
                        formatter:function(){
                            if(this.y > 0)
                                return this.y;
                        },
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                    }
                },
                series: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function() {
                                $scope.redirectToTrades(this.type, this.status,this.category)
                            }
                        }
                    }
                }
            },
            legend: {
                "enabled": true
            },
            series: $scope.weekData
        });
        setTimeout(function() {
            $("#container-1").highcharts().reflow();
        }, 100)
    }
    // $scope.initFailedChart = function(failedData) {
    //     labels = _.map(failedData, 'type')
    //     var seriesData = []
    //     var tempData = {
    //         name: 'Fail',
    //         data: []
    //     }
    //     _.each(failedData, function(item) {
    //         tempData.data.push({
    //             y: item.count,
    //             "type": item.type
    //         })
    //     })
    //     seriesData.push(tempData)
    //
    //     Highcharts.chart('container', {
    //         chart: {
    //             type: 'column',
    //             backgroundColor: 'transparent'
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         title: {
    //             text: 'Fail'
    //         },
    //
    //         xAxis: {
    //             categories: labels,
    //             title: {
    //                 text: 'Message types',
    //                 y: 10
    //             }
    //         },
    //
    //         yAxis: {
    //             allowDecimals: false,
    //             min: 0,
    //             title: {
    //                 text: 'Number of trades'
    //             }
    //         },
    //
    //         tooltip: {
    //             formatter: function() {
    //                 return '<b>' + this.x + '</b><br/>' +
    //                     this.series.name + ': ' + this.y + '<br/>'
    //             }
    //         },
    //
    //         plotOptions: {
    //             column: {
    //                 stacking: 'normal'
    //             },
    //             series: {
    //                 cursor: 'pointer',
    //                 point: {
    //                     events: {
    //                         click: function() {
    //                             $scope.redirectToTrades(this.type, "FAIL")
    //                         }
    //                     }
    //                 }
    //             }
    //         },
    //         legend: {
    //             "enabled": false
    //         },
    //         series: seriesData
    //     });
    //     setTimeout(function() {
    //         $("#container").highcharts().reflow();
    //     }, 500)
    // }
}

app.controller('loginCtrl', ['$rootScope', '$scope', '$http', '$location', 'authService', '$window', loginCtrl]);

function loginCtrl($rootScope, $scope, $http, $location, authService, $window) {
    $rootScope.locationPath = $location.$$path;
    $scope.credentials = {
        'userName': '',
        'password': ''
    };

    if ($rootScope.$storage.currentUser) {
        $window.location.href = '/#/dashboard';
    }

    $scope.doLogin = function() {
        authService.login($scope.credentials).then(function(res) {
            if (res.data.status === 'success') {
                $location.path('/dashboard');
                $rootScope.$broadcast('SELECTED_TAB', 'dashboard');
            } else {
                $scope.message = "Invalid Credentials";
            }
        });
    }
}
