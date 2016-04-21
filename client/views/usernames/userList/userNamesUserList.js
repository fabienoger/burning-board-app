/********************
        HELPERS
********************/

Template.userNamesUserList.helpers({
  // Return users
  getUsers: function() {
    return Meteor.users.find().fetch();
  }
});
