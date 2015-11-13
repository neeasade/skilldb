
if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor', 'xeditable', 'smart-table'])
  .controller('EmployeeCtrl', ['$scope', '$meteor', '$filter',
  function EmployeeCtrl($scope, $meteor, $filter) {
    // relate the monogodb collections
    $scope.employees = $meteor.collection(Employees);

    $scope.skills = $meteor.collection(Skills);
    $scope.titles = $meteor.collection(Titles);
    $scope.locations = $meteor.collection(Locations);
    $scope.clients = $meteor.collection(Clients);

    // sections to loop through to do table repeats
    $scope.tableSections = [
    { name: 'Skills', collection: $scope.skills },
    { name: 'Titles', collection: $scope.titles },
    { name: 'Clients', collection: $scope.clients },
    { name: 'Locations', collection: $scope.locations }
    ];

  }]);
}
