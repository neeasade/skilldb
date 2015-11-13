// ------------- Documents layout (MongoDB tables) -------------
// Defining them makes access available in both client and server side.
// We are using the dburles:collection-helpers package to make foreign-key like features a thing.

// ID, Name, Title_ID, Location_ID,
Employees = new Mongo.Collection("employees");

// Categories, only one document item per (using id)
Skills = new Mongo.Collection("skills");
Titles = new Mongo.Collection("title");
Locations = new Mongo.Collection("location");
Clients = new Mongo.Collection("client");

Employees.helpers({
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  title: function() {
    return this.findOne(this.titleId);
  },
  location: function() {
    return this.findOne(this.locationId);
  }
})

// ID, Client_ID, Active(bool), Bill_rate, Start_date, End_date, Bill_type(hourly, monthly), Utilization, Project_name
Roles = new Mongo.Collection("roles");

// Login ( perhaps to be handled not like this )
Logins = new Mongo.Collection("logins");
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
        { firstName: 'Bob', lastName: 'Smith',
          title: 'title1',
          location: 'location1'},
        { firstName: 'Ricky', lastName: 'Bobby',
          title: 'title2',
          location: 'location1'}
      ];

      // filler for the others
      var skills = [{'_id' : 'skill1'}, {'_id' : 'skill2'}];
      var titles = [{'_id' : 'title1'}, {'_id' : 'title2'}];
      var clients = [{'_id' : 'client1'}, {'_id' : 'client2'}];
      var locations = [{'_id' : 'location1'}, {'_id' : 'location2'}];

      // Populate the arrays:
      for (var i = 0; i < skills.length; i++)
        Skills.insert(skills[i]);
      for (var i = 0; i < titles.length; i++)
        Titles.insert(titles[i]);
      for (var i = 0; i < clients.length; i++)
        Clients.insert(clients[i]);
      for (var i = 0; i < locations.length; i++)
        Locations.insert(locations[i]);

      for (var i = 0; i < employees.length; i++)
        Employees.insert(Employees._transform(employees[i]));
    }
  });
}
