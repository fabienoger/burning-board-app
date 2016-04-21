/********************
       HELPERS
********************/

Template.connectedUsers.helpers({
  // Return Array of users
  getUsers: function() {
    return Meteor.users.find({$nor: [{"profile.name": "Super Admin"}, {"profile.name": "Admin"}]}).fetch();
  }
});
