Employees = new Mongo.Collection("employees");

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Employees.find().count() === 0) {
      // Filler if no employees are found.
      var employees = [
        {'name': 'Bob Smith',
          'description': 'Fast just got faster with Nexus S.'},
        {'name': 'Jenna Marbles',
          'description': 'Get it on!'},
        {'name': 'Cool Guy',
          'description': 'Leisure suit required. And only fiercest manners.'}
      ];
      for (var i = 0; i < employees.length; i++)
        Employees.insert(employees[i]);
    }
  });
}
