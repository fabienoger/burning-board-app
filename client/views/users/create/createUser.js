Template.createUser.rendered = function() {
  // Initialize checkbox
  $('.ui.toggle.checkbox').checkbox();
}

Template.createUser.events({
  // Data processing for new user & create user
  'click #submit-new-user-form': function(e, t) {
    e.preventDefault();

    // Get all inputs values
    var email = t.find('#account-email');
    var password = t.find('#account-password');
    var confirmPassword = t.find('#confirm-password');
    var admin = t.find('#account-admin');
    var superAdmin = t.find('#account-super-admin');

    // Set RegExp for email
    var regEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/);

    // Check if currentUser is admin
    if (Meteor.user().profile.admin == false)
      return false;

    // Check if all fields are filled
    if (email.value.trim() && password.value.trim() && confirmPassword.value.trim()) {
      // Check e-mail format
      if (regEmail.test(email.value.trim())) {
        // Check if the two password as equals
        if (password.value.trim() == confirmPassword.value.trim()) {

          // Define user object
          var user = {
            email: email.value.trim(),
            password: password.value.trim(),
            profile: {
              active: true,
              admin: admin.checked,
              superAdmin: superAdmin.checked,
              changeUserName: false,
              username: ""
            }
          };

          // Accounts Create user
          Meteor.call("newUser", user, function(error, result) {
            if (error) {
              if (error.error == 400) {
                sAlert.warning(TAPi18n.__("fields_are_required"));
              } else if (error.error == 403) {
                sAlert.warning(TAPi18n.__("email_already_exist"));
              } else {
                console.log(err);
                sAlert.error(TAPi18n.__("something_went_wrong"));
              }
            } else {
              // Clean all fields
              email.value = "";
              password.value = "";
              confirmPassword.value = "";
              admin.checked = false;
              superAdmin.checked = false;

              // Display success message
              sAlert.warning(TAPi18n.__("user_successfully_created"));
            }
          });
        } else {
          sAlert.warning(TAPi18n.__("passwords_not_equals"));
        }
      } else {
        sAlert.warning(TAPi18n.__("invalid_email"));
      }
    } else {
      sAlert.warning(TAPi18n.__("fields_are_required"));
    }
  }
});
