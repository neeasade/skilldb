
if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor', 'xeditable', 'smart-table'])
  .controller('EmployeeCtrl', ['$scope', '$meteor', '$filter', '$log',
  function EmployeeCtrl($scope, $meteor, $filter, $log) {
    // relate the monogodb collections
    $scope.employees = $meteor.collection(Employees);
    $scope.roles = $meteor.collection(Roles);

    $scope.skills = $meteor.collection(Skills);
    $scope.titles = $meteor.collection(Titles);
    $scope.locations = $meteor.collection(Locations);
    $scope.clients = $meteor.collection(Clients);

    // Sections for documents with only one property: _id
    // name: title
    // handle: angularjs handle in this controller
    // collection: mongodb collection reference
    // displayArray: empty array for smart table async.
    // addValue: value for dynamic adding at foot of table.
    // order here matters, it is referenced in UpdateEmployeesRoles()
    $scope.SingleSections = [
    { name: 'Skills', handle: $scope.skills, collection: Skills, displayArray: [], addValue: ''},
    { name: 'Titles', handle: $scope.titles, collection: Titles, displayArray: [], addValue: ''},
    { name: 'Clients', handle: $scope.clients, collection: Clients, displayArray: [], addValue: ''},
    { name: 'Locations', handle: $scope.locations, collection: Locations, displayArray: [], addValue: ''}
    ];

    // pagination limit
    $scope.ItemsPerPage = 2;

    // options to reference for Bill type
    $scope.billTypes = [
      { type: 'Hourly' },
      { type: 'Monthly' }
    ];

    $scope.addItem = function(section, id) {
      if ($scope.SingleSections[section].collection.find({'_id': id}).count() === 0 && id !== undefined && id !== '') {
        $scope.SingleSections[section].collection.insert({_id: id});
      }
    };

    // Delete an item, remote it from any employees or roles.
    $scope.deleteItem = function(section, id) {
      $scope.SingleSections[section].collection.remove(id);
    };

    // Here down are functions that perform checks or edits on data as it changes.
    $scope.UpdateEmployeesRoles = function(before, after, index) {
      if (after === '') {
        return "Empty not allowed.";
      } else if($scope.SingleSections[index].collection.findOne({_id: after}) !== null) {
        return "Entry exists."
      } else {
        // it is assumed the change will be successful, so we will change
        // employees and roles here.
        // Can't do multi updates via client side code, which would be eg:
            /*
            Employees.handle.update(
                { titleId: before },
                { $set: { titleId: after } },
                { multi: true }
                );
            */
        switch(index) {
          case 1:
            Employees.find({titleId: before}).forEach(function(Emp) {
              Emp.titleId = after;
              $scope.employees.save(Emp);
            });
            break;
          case 3:
            Employees.find({locationId: before}).forEach(function(Emp) {
              Emp.locationId = after;
              $scope.employees.save(Emp);
            });
            break;
          case 'Clients':
            for (var i = 0; i < $scope.roles.length; i++)
              $scope.roles[i].locationId = ($scope.roles[i].locationId === before ? after : before);
            break;
          default:
            break;
        }
      }
    };

    $scope.ValidateEmpty = function(data) {
      if (data === '')
        return "Empty not allowed.";
    };

    $scope.ValidateCurrency = function (data) {
      // does not allow more than 2 trailing decimal values
      var regexp = /^\d+(\.\d{1,2})?$/g;
      if (!regexp.test(data)) {
        return "Invalid value, must be number or have trailing numbers up to 2. eg: 10, 10.34, not 10.";
      }
    }

  }]);
}
