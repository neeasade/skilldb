
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

    // sections to loop through to do table repeats
    // order here matters, it is the index referenced by deleteItem()
    $scope.tableSections = [
    { name: 'Skills', collection: $scope.skills },
    { name: 'Titles', collection: $scope.titles },
    { name: 'Clients', collection: $scope.clients },
    { name: 'Locations', collection: $scope.locations }
    ];

    // Arrays for smart table to watch/handle safe copy of to handle async.
    $scope.displayedArrays = {};
    $scope.displayedArrays['Skills'] = [];
    $scope.displayedArrays['Titles'] = [];
    $scope.displayedArrays['Clients'] = [];
    $scope.displayedArrays['Locations'] = [];

    // Arrays for add model to be dynamic
    $scope.AddValue = ["", "", "", ""];

    // options to reference for Bill type
    $scope.billTypes = [
      { type: 'Hourly' },
      { type: 'Monthly' }
    ];

    // Delete an item, remote it from any employees or roles.
    $scope.addItem = function(section, id) {
      $log.log(section+' '+id);
      switch(section) {
        case 0:
          if (Skills.find({'_id': id}).count() === 0)
            Skills.insert({_id: id});
          break;
        case 1:
          //if (Titles.find(ObjectId(id)) === undefined)
           // Titles.Inser
          break;
        case 2:
          $scope.clients.remove(id);
          break;
        case 3:
          $scope.locations.remove(id);
          break;
        default:
          break;
      }
    }

    // Delete an item, remote it from any employees or roles.
    $scope.deleteItem = function(section, id) {
      switch(section) {
        case 0:
          $scope.skills.remove(id);
          break;
        case 1:
          //relates = Roles_Employees.find({roleId: this._id});
          $scope.employees.find({titleId: id });
          $scope.titles.remove(id);
          break;
        case 2:
          $scope.clients.remove(id);
          break;
        case 3:
          $scope.locations.remove(id);
          break;
        default:
          break;
      }
    };

    // Here down are functions that perform checks or edits on data as it changes.
    $scope.UpdateEmployeesRoles = function(before, after, type) {
      if (after === '') {
        return "Empty not allowed.";
      } else {
        // it is assumed the change will be successful, so we will change
        // employees and roles with this here.
        switch(type) {
          case 'Titles':
            for (var i = 0; i < $scope.employees.length; i++)
              $scope.employees[i].titleId = ($scope.employees[i].titleId === before ? after : before);
            break;
          case 'Locations':
            for (var i = 0; i < $scope.employees.length; i++)
              $scope.employees[i].locationId = ($scope.employees[i].locationId === before ? after : before);
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
