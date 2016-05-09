Template.updateUser.rendered = function() {
  // Initialize checkbox
  $('.ui.toggle.checkbox').checkbox();
}

Template.updateUser.events({
  'submit #update-user': function(e, t) {
    e.preventDefault();
    // Get DOM inputs
    var newEmail = t.find('#account-email');
    var newAdmin = t.find('#account-admin');
    var newSuperAdmin = t.find('#account-super-admin');

    var selectedUser = Modules.client.user.updateUser.get();

    // If currentUser is admin
    if (Meteor.user().profile.admin) {
      // If all fields are filled continue else show message;
      if (newEmail.value) {
        Meteor.call("upsertUser", selectedUser._id, {
          $set: {
            "emails.0.address": newEmail.value.trim(),
            "profile.admin": newAdmin.checked,
            "profile.superAdmin": newSuperAdmin.checked
          }
        }, function(error, result) {
          if (error) {
            console.log(error);
            Modules.client.utils.displayPanel("update-user-info", "negative", "warning", "Oups, Something went wrong.");
          } else {
            Modules.client.utils.displayPanel("update-user-info", "positive", "checkmark", "The user been updated.");
          }
        });
      } else {
        // Display info message
        Modules.client.utils.displayPanel("update-user-info", "negative", "warning", "All fields are required..");
      }
    } else {
      // Redirect to home page
      FlowRouter.go('home');
    }
  }
});

Template.updateUser.helpers({
  'selectedUser': function() {
    return Modules.client.user.updateUser.get();
  }
});
