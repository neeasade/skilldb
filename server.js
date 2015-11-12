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

      // filler for the others
      var skills = [{'_id' : 'skill1'}, {'_id' : 'skill2'}];
      var titles = [{'_id' : 'title1'}, {'_id' : 'title2'}];
      var clients = [{'_id' : 'client1'}, {'_id' : 'client2'}];
      var locations = [{'_id' : 'location1'}, {'_id' : 'location2'}];

      // Populate the arrays:
      for (var i = 0; i < employees.length; i++)
        Employees.insert(employees[i]);

      for (var i = 0; i < skills.length; i++)
        Skills.insert(skills[i]);
      for (var i = 0; i < titles.length; i++)
        Titles.insert(titles[i]);
      for (var i = 0; i < clients.length; i++)
        Clients.insert(clients[i]);
      for (var i = 0; i < locations.length; i++)
        Locations.insert(locations[i]);
    }
  });
}
