/********************
        HELPERS
********************/

Template.userNamesUserList.helpers({
  // Return users
  getUsers: function() {
    return Meteor.users.find({$nor: [{"profile.name": "Super Admin"}, {"profile.name": "Admin"}]}).fetch();
  }
});
