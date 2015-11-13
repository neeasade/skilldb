
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

    // Empty entries are not allowed.
    $scope.ValidateEmpty = function(before, after, type) {
      if (after === '') {
        return "Empty not allowed.";
      } else {
        // it is assumed the change will be successful, so we will change
        // employees and roles with this here.
        switch(type) {
          case 'Titles':
            for (var i = 0; i < $scope.employees.length; i++)
              $scope.employees[i].title = ($scope.employees[i].title === before ? after : before);
            break;
          case 'Locations':
            for (var i = 0; i < $scope.employees.length; i++)
              $scope.employees[i].location = ($scope.employees[i].location === before ? after : before);
            break;
          default:
            break;
        }
      }
    };
  }]);
}
