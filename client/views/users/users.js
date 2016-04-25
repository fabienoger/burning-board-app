Template.users.rendered = function() {
  // Initialize dropdown semantic-ui
  $('.ui.accordion').accordion();
}

Template.users.events({
  // Empty the updateUser ReactiveVar
  'click #empty-update-user': function(e, t) {
    Modules.client.user.updateUser.set(false);
  },
  // Display form on the right for updating user
  'click .update-user': function(e, t) {
    var user = null;
    if (e.currentTarget.dataset.id) {
      // Get the user with the _id
      user = Meteor.users.findOne({_id : e.currentTarget.dataset.id});
      Modules.client.user.updateUser.set(user);
    } else {
//      console.log(e.target);
    }
  },
  // Remove a user
  'click .remove-user': function(e, t) {
    // Check if e.target.value != null
    if (e.currentTarget.dataset.id) {
      // Check if currentUser is Admin
      if (Meteor.user().profile.admin) {
        // Set profile.active to false
        Meteor.call("upsertUser", e.currentTarget.dataset.id, {$set: {'profile.active': false}}, function(error, result) {
          if (error) {
            console.log(error);
          } else {
            Modules.client.utils.displayPanel("info-users", "positive", "checkmark", "The user been updated. Account not active.");
          }
        });
      } else {
        // Redirect user to home page
        FlowRouter.go('home');
      }
    } else {
//      console.log(e.target);
       Modules.client.utils.displayPanel("info-users", "negative", "warning", "Oups, Something went wrong.");
    }
  }
});

Template.users.helpers({
  // Initialize checkbox in update-user form
  'initializeCheckbox': function() {
    // Initialize checkbox
    $('.ui.toggle.checkbox').checkbox();
  },
  // Return all users
  'users': function() {
    return Meteor.users.find({}).fetch();
  },
  // Get the currentUser selected
  'selectedUser': function() {
    return Modules.client.user.updateUser.get();
  }
});
