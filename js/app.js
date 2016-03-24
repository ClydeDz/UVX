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
	            $window.location = "#/data";
	        }, 2000);
	        
	        console.log(x);
	    };
	}]);

angular.module('UVX')
	.controller('DataTypeController', ['$scope', '$window', 'dataModel', '$timeout', function ($scope, $window, dataModel, $timeout) {
	    var dtc=dataModel.getPeopleResponse();
	    $scope.triggerChange = function (x) {
	        var tcData = {
	            'schoolID': dtc.schoolID,
	            'schoolName': "" + dtc.schoolName,
	            'dataType': x,
	            'preference': 0
	        };
	        dataModel.savePeopleResponse(tcData);
	        $timeout(function () {
	            $window.location = "#/preference";
	        }, 2000);

	        console.log(x);
	    };
	}]);

angular.module('UVX')
	.controller('PreferenceController', ['$scope', '$window', 'dataModel', '$timeout', function ($scope, $window, dataModel, $timeout) {
	    var dtc = dataModel.getPeopleResponse();
	    $scope.triggerChange = function (x) {
	        var tcData = {
	            'schoolID': dtc.schoolID,
	            'schoolName': "" + dtc.schoolName,
	            'dataType': dtc.dataType,
	            'preference': x
	        };
	        dataModel.savePeopleResponse(tcData);
	        $timeout(function () {
	            $window.location = "#/code";
	        }, 2000);
	        console.log(x);
	    };
	}]);

angular.module('UVX')
	.controller('CodeController', ['$scope', '$window', 'dataModel', '$timeout', function ($scope, $window, dataModel, $timeout) {
	    var dtc = dataModel.getPeopleResponse();
	    var tcData = {
	        'schoolID': dtc.schoolID,
	        'schoolName': "" + dtc.schoolName,
	        'dataType': dtc.dataType,
	        'preference': dtc.preference
	    };
	    $scope.source = "/embed/index.html?schoolId=" + tcData.schoolID + "&schoolName=" + tcData.schoolName + "&dataType=" + tcData.dataType + "&preference=" + tcData.preference;

	    $scope.triggerChange = function () {	      
	        dataModel.savePeopleResponse(tcData);
	        $timeout(function () {
	            $window.location = "/embed/index.html?schoolId=" + tcData.schoolID + "&schoolName=" + tcData.schoolName + "&dataType=" + tcData.dataType + "&preference=" + tcData.preference;
	        }, 2000);
	        //console.log(x);
	    };
	}]);
