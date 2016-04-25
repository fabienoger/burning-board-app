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
                Modules.client.utils.displayPanel("new-user-info", "negative", "warning", "The password fields must be required.");

              } else if (error.error == 403) {
                Modules.client.utils.displayPanel("new-user-info", "negative", "warning", "This email address is already registered.");
              } else {
                console.log(err);
              }
            } else {
              // Clean all fields
              email.value = "";
              password.value = "";
              confirmPassword.value = "";
              admin.checked = false;
              superAdmin.checked = false;

              // Display success message
              Modules.client.utils.displayPanel("new-user-info", "positive", "checkmark", "The user has been created.");
            }
          });
        } else {
          Modules.client.utils.displayPanel("new-user-info", "negative", "warning", "The two passwords must be identical.");
        }
      } else {
        Modules.client.utils.displayPanel("new-user-info", "negative", "warning", "The email is not valid.");
      }
    } else {
      Modules.client.utils.displayPanel("new-user-info", "negative", "warning", "All fields are required.");
    }
  }
});
