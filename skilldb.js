if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor']);

  angular.module('skilldb').controller('EmployeeCtrl', ['$scope', function ($scope) {
    $scope.employees = [
      {
        'name': 'Bob Smith',
      },
      {
        'name': 'Sarah Wells',
      }
    ];
  }]);
}
