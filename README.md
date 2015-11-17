## skilldb
This is an employee skills database meteor project, with the focus on angular. Meteor is used to ease of database logic and deployment.

Notable used angular directives/ui:
- [Smart Table](http://lorenzofox3.github.io/smart-table-website/)
- [xeditable angular](http://vitalets.github.io/angular-xeditable/)

There are two types of users, users who can edit data, and users who can't, you must have a logon to view the data.

TODO:
- [ ] Authentification
	- [ ] Views to edit users
	- [ ] conditions to disable editing options in existing views per permission.
- [ ] Navbar
- [ ] Employee view
	- [ ] Skill toggles
	- [ ] role toggles
- [ ] Role view
	- [ ] Skill toggles


## how do I run this?
- Install meteor: https://www.meteor.com/install
- In the cloned directory, run `meteor`
- Navigate to http://localhost:3000 to see it in action. Planned default login is admin/admin.

Related links:
- https://atmospherejs.com/dotansimha/accounts-ui-angular
- https://angular-meteor.com/tutorials/angular1/
- https://www.meteor.com/
- http://angular-meteor.com/
- https://atmospherejs.com/dburles/collection-helpers
