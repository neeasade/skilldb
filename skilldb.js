//Employees = new Mongo.Collection("employees");

if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor']);

  angular.module('skilldb').controller('EmployeeCtrl', function ($scope, $meteor) {
    $scope.employees = $meteor.collection(Employees);
  });
}
