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
            sAlert.error(TAPi18n.__("something_went_wrong"));
          } else {
            sAlert.warning(TAPi18n.__("user_inactive"));
          }
        });
      } else {
        // Redirect user to home page
        FlowRouter.go('home');
        sAlert.warning(TAPi18n.__("user_not_allowed"));
      }
    } else {
//      console.log(e.target);
      sAlert.warning(TAPi18n.__("something_went_wrong"));
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
    return Meteor.users.find({
      $and: [
          {"profile.name": {$not: "Super Admin"}},
          {"profile.name": {$not: "Admin"}}
      ]
    }).fetch();
  },
  // Get the currentUser selected
  'selectedUser': function() {
    return Modules.client.user.updateUser.get();
  },
  // Return current user language or false
  getLanguage: function(userLanguage) {
    var language = userLanguage;
    if (language == "en") {
      return "gb";
    }
    return "fr";
  }
});
