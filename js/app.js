// app.js
angular.module('UVX',['ngRoute']);

angular.module("UVX")
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "../views/school.html", controller: "SchoolController"})
            .when("/data", { templateUrl: "../views/data.html", controller: "DataTypeController" })
            .when("/preference", { templateUrl: "../views/preference.html", controller: "PreferenceController" })
            .when("/code", { templateUrl: "../views/code.html", controller: "CodeController" })
            .otherwise({ templateUrl: "" });
    }]);

angular.module('UVX')
    .factory('dataModel', function () {
        var widgetConfig = {
            'schoolID': 0,
            'schoolName': "",
            'dataType': 0,
            'preference':0
        };

        return {
            savePeopleResponse: function (data) {
                widgetConfig = data;
                console.log(data);
            },
            getPeopleResponse: function () {
                return widgetConfig;
            }
        };
    });

angular.module('UVX')
	.controller('SchoolController', ['$scope', '$window', 'dataModel', '$timeout', function ($scope, $window, dataModel, $timeout) {

	    $scope.addresses = [
            { 'state': 'AL' },
            { 'state': 'CA' },
            { 'state': 'FL' }
	    ];

	    $scope.lov_state = [
            { 'lookupCode': 'AL', 'description': 'Alabama' },
            { 'lookupCode': 'FL', 'description': 'Florida' },
            { 'lookupCode': 'CA', 'description': 'California' },
            { 'lookupCode': 'DE', 'description': 'Delaware' }
	    ];

	    $scope.triggerChange = function (x) {
	        var tcData = {
	            'schoolID': x,
	            'schoolName': ""+x,
	            'dataType': 0,
	            'preference': 0
	        };
	        dataModel.savePeopleResponse(tcData);
	        $timeout(function () {
	            $window.location = "/embed/index.html?school=" + x;
	        }, 2000);
	        
	        console.log(x);
	    };
	}]);

angular.module('UVX')
	.controller('DataTypeController', ['$scope', function ($scope) {

	}]);

angular.module('UVX')
	.controller('PreferenceController', ['$scope', function ($scope) {

	}]);

angular.module('UVX')
	.controller('CodeController', ['$scope', function ($scope) {

	}]);
