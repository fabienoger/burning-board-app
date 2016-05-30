Template.editUser.rendered = function() {
}

/****************************************
#####            HELPERS            #####
****************************************/

Template.editUser.helpers({
  // Return email of the current user
  getCurrentUserEmail: function() {
    if (Meteor.user())
      return Meteor.user().emails[0].address;
  }
});

/****************************************
#####             EVENTS            #####
****************************************/

Template.editUser.events({
  // Change password function
  'submit #change-password-form': function(e, t) {
    e.preventDefault();
    // Get DOM inputs
    var oldPassword = t.find('#oldPassword');
    var newPassword = t.find('#newPassword');
    var confirmPassword = t.find('#confirmPassword');

    // If all fields are continue else return;
    if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
      sAlert.warning(TAPi18n.__("fields_are_required"));
      return;
    }

    // Check if user is login else redirect to '/login'
    if (Meteor.user()) {
      // Check if newPassword is equal to confirmPassword
      if (newPassword.value === confirmPassword.value) {
        // Change password
        Accounts.changePassword(oldPassword.value.trim(), newPassword.value.trim(), function(error, result) {
          if (error) {
            console.log(error);
            // Incorrect Password
            if (error.error == 403) {
              sAlert.warning(TAPi18n.__("incorrect_password"));
            }
          } else {
            // Empty input fields
            oldPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';

            sAlert.success(TAPi18n.__("pwd_successfully_updated"));
          }
        });
      } else {
        sAlert.warning(TAPi18n.__("passwords_not_equals"));
      }
    } else {
      FlowRouter.go('/login');
    }
  }
});
