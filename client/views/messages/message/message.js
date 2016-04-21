/********************
       HELPERS
********************/

Template.message.helpers({
  // Return the user with the given _id
  getUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  }
});
