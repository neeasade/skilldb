// ------------- Documents layout (MongoDB tables) -------------
// Defining them makes access available in both client and server side.
// We are using the dburles:collection-helpers package to make foreign-key like features a thing.

// ID, Name, Title_ID, Location_ID,
Employees = new Mongo.Collection("employees");

// ID, Client_ID, Active(bool), Bill_rate, Start_date, End_date, Bill_type(hourly, monthly), Utilization, Project_name
Roles = new Mongo.Collection("roles");


// Categories, only one document item per (using id)
Skills = new Mongo.Collection("skills");
Titles = new Mongo.Collection("title");
Locations = new Mongo.Collection("location");
Clients = new Mongo.Collection("client");

// Relations
Employees_Skills = new Mongo.Collection("employee_skills");
Employees_Roles = new Mongo.Collection("employees_roles");
Roles_Skills = new Mongo.Collection("roles_skills");
Roles_Employees = new Mongo.Collection("roles_employees");

Employees.helpers({
  fullName: function() {
    return this.firstName + ' ' + this.lastName;
  },
  skills: function() {
    relates = Employees_Skills.find({employeeId: this._id});
    toReturn=[];
    // make an array of the skills only, return that.
    for (var i=0; i < relates.length; i++) {
      toReturn.push(relates[i].skillId);
    }
    return toReturn;
  },
  roles: function() {
    relates = Employees_Roles.find({employeeId: this._id});
    roleIds=[];
    for (var i=0; i < relates.length; i++) {
      roleIds.push(relates[i].roleId);
    }
    roles = Roles.find({ _id: { $in: roleIds }});
    return roles;
  }
});

Roles.helpers({
  skills: function() {
    relates = Roles_Skills.find({roleId: this._id});
    toReturn=[];
    for (var i=0; i < relates.length; i++) {
      toReturn.push(relates[i].skillId);
    }
    return toReturn;
  },
  employees: function() {
    relates = Roles_Employees.find({roleId: this._id});
    employeeIds=[];
    for (var i=0; i < relates.length; i++) {
      employeeIds.push(relates[i].employeeId);
    }
    employees = Employees.find({ _id: { $in: employeeIds }});
    return employees;
  }
});


// Login ( perhaps to be handled not like this )
Logins = new Mongo.Collection("logins");

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Employees.find().count() === 0) {
      // Filler if no employees are found.
      var employees = [
        { firstName: 'Bob', lastName: 'Smith'},
        { firstName: 'Ricky', lastName: 'Bobby'},
        { firstName: 'yeah', lastName: 'yeah_last'}
      ];

      var roles = [
        { name: 'Role!',
          clientId: 'client1',
          active: false,
          Bill_rate: 1.00,
          Bill_type: 'Hourly',
          Start_date: 'asdf',
          End_date: 'asdf',
          Utilization: 'todo'}
      ]

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

      for (var i = 0; i < roles.length; i++)
        Roles.insert(roles[i]);

    }
  });
}
