
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

    // set table params
    $scope.employeeTable = getDetaultParams($scope.employees);
    $scope.skillTable = getDetaultParams($scope.skills);
    $scope.titleTable = getDetaultParams($scope.titles);
    $scope.clientTable = getDetaultParams($scope.clients);
    $scope.locationTable = getDetaultParams($scope.locations);

    // set table columns by ID, for single property items.
    $scope.skillCols = getSingleColumn('Skills');
    $scope.titleCols = getSingleColumn('Titles');
    $scope.clientCols = getSingleColumn('Clients');
    $scope.locationCols = getSingleColumn('Locations');

    // sections to loop through to do table repeats
    $scope.tableSections = ['skill', 'title', 'client', 'location'];

    // for collections that will only have an ID, parameter sets the table header title
    function getSingleColumn(name) {
      return [{ field: "_id", title: name, sortable: "_id", show: true }]
    }

    // default parameters for all the tables, to control pagination/buttons/other.
    function getDetaultParams(dataSource) {
      return new NgTableParams({
        sorting: { name: 'asc'}
        }, {
        getData: function($defer, params) {
            $defer.resolve($filter('orderBy')(dataSource, params.orderBy()));
        }
      });
    }

  }]);
}
