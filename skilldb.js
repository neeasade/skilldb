//Employees = new Mongo.Collection("employees");

if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor', 'ngTable']);

  angular.module('skilldb').controller('EmployeeCtrl', function ($scope, $meteor) {
    $scope.employees = $meteor.collection(Employees);

	$scope.$inject = ["NgTableParams"];
    function demoController(NgTableParams, simpleList) {
          var self = this;
          self.tableParams = new NgTableParams({}, {
                  dataset: simpleList
          });
    };

  });

}
