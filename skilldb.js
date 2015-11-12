
if (Meteor.isClient) {
  angular.module('skilldb', ['ngTable', 'angular-meteor'])
  .controller('EmployeeCtrl', ['$scope', '$meteor', '$filter', 'ngTableParams',
  function EmployeeCtrl($scope, $meteor, $filter, NgTableParams) {
    // relate the monogodb collections
    $scope.employees = $meteor.collection(Employees);
    $scope.skills = $meteor.collection(Skills);
    $scope.titles = $meteor.collection(Titles);
    $scope.locations = $meteor.collection(Locations);
    $scope.clients = $meteor.collection(Clients);

    $scope.tableParams = new NgTableParams({
      //count: 1,
      sorting: {
        name: 'asc'
      }
    }, {
      //dataset: temp
      getData: function($defer, params) {
          $defer.resolve($filter('orderBy')($scope.employees, params.orderBy()));
      }
    });
  }]);
}
