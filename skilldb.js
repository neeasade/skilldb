
if (Meteor.isClient) {
  angular.module('skilldb', ['angular-meteor', 'ui.router', 'xeditable', 'smart-table'])
  .controller('EmployeeCtrl', ['$scope', '$meteor', '$filter', '$log',
  function EmployeeCtrl($scope, $meteor, $filter, $log) {
    // relate the monogodb collections
    $scope.employees = $meteor.collection(Employees);
    $scope.roles = $meteor.collection(Roles);

    // single property(_id)
    $scope.skills = $meteor.collection(Skills);
    $scope.titles = $meteor.collection(Titles);
    $scope.locations = $meteor.collection(Locations);
    $scope.clients = $meteor.collection(Clients);

    // relates/maps
    $scope.employees_skills = $meteor.collection(Employees_Skills);
    $scope.employees_roles = $meteor.collection(Employees_Roles);
    $scope.roles_skills = $meteor.collection(Roles_Skills);
    $scope.roles_employees = $meteor.collection(Roles_Employees);

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
    $scope.ItemsPerPage = 5;

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

    // Delete an item, remove it from any employees or roles.
    $scope.deleteItem = function(section, id) {
      // TODO: remove from employees or roles here.
      $scope.SingleSections[section].collection.remove(id);
    };

    // Here down are functions that perform checks or edits on data as it changes.
    $scope.UpdateEmployeesRoles = function(before, after, index) {
      if (after === '') {
        return "Empty not allowed.";
      } else if($scope.SingleSections[index].collection.findOne({_id: after}) !== undefined) {
        return "Entry exists.";
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
          // these indexes match with the SingleSelections array.
          case 0: //role skills, employee skills
            Roles_Skills.find({skillId: before}).forEach(function(lRelate) {
              lRelate.skillId = after;
              $scope.roles_skills.save(lRelate);
            });
            Employees_Skills.find({skillId: before}).forEach(function(lRelate) {
              lRelate.skillId = after;
              $scope.employees_skills.save(lRelate);
            });
            break;
          case 1:
            Employees.find({titleId: before}).forEach(function(lEmployee) {
              lEmployee.titleId = after;
              $scope.employees.save(lEmployee);
            });
            break;
          case 2:
            Roles.find({clientId: before}).forEach(function(lRole) {
              lRole.clientId = after;
              $scope.roles.save(lRole);
            });
            break;
          case 3:
            Employees.find({locationId: before}).forEach(function(lEmployee) {
              lEmployee.locationId = after;
              $scope.employees.save(lEmployee);
            });
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

  }])
  .controller('EmployeeDetailsCtrl', ['$scope', '$meteor', '$stateParams', '$state', '$filter', '$log',
  function EmployeeDetailsCtrl($scope, $meteor, $stateParams, $state, $filter, $log) {
    // Focused employee:
    $scope.employee = $meteor.object(Employees, $stateParams.EmployeeId);

    // db collection references
    $scope.skills = $meteor.collection(Skills);
    $scope.titles = $meteor.collection(Titles);
    $scope.locations = $meteor.collection(Locations);
    $scope.clients = $meteor.collection(Clients);

    // relates/maps
    $scope.employees_skills = $meteor.collection(Employees_Skills);
    $scope.employees_roles = $meteor.collection(Employees_Roles);

    // table copy arrays for async:
    $scope.refSkills = [];
    $scope.refEmployeeSkills = [];


    $scope.addSkill = function(id) {
      $scope.employees_skills.push( {employeeId: $scope.employee._id, skillId: id});
    };

    $scope.removeSkill = function(id) {
      Employees_Skills.find({employeeId: $scope.employee._id});
    };

    $scope.hasSkill = function(id) {
      return ($scope.employee.skills().indexOf(id) !== -1);
    };

    $scope.EmployeeSkills = $meteor.collection(function(){
      return Employees_Skills.find( { property : $scope.employee._id } );
    });

 }])
 .config(function($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('summary', {
        url: '/summary',
        templateUrl: 'views/summary.html',
        controller: 'EmployeeCtrl'
      })
      .state('EmployeeView', {
        url: '/employee/:EmployeeId',
        templateUrl: 'views/employee.html',
        controller: 'EmployeeDetailsCtrl'
      });

    $urlRouterProvider.otherwise("/summary");
  });
}
