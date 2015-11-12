// ------------- Documents layout (MongoDB tables) -------------
// Defining them makes access available in both client and server side.

// ID, Name, Title_ID, Location_ID, Login_ID, EditRights(bool)
Employees = new Mongo.Collection("employees");

// ID, Client_ID, Active(bool), Bill_rate, Start_date, End_date, Bill_type(hourly, monthly), Utilization, Project_name
Roles = new Mongo.Collection("roles");

// Login
Logins = new Mongo.Collection("logins");

// Categories, only one document item per.
Skills = new Mongo.Collection("skills");
Titles = new Mongo.Collection("title");
Locations = new Mongo.Collection("location");
Clients = new Mongo.Collection("client");

// Relations
Employees_Skills = new Mongo.Collection("employee_skills");
Employees_Roles = new Mongo.Collection("employees_roles");
Roles_Skills = new Mongo.Collection("roles_skills");
Roles_Employees = new Mongo.Collection("roles_employees");

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
