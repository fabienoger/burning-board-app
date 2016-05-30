// Register
Template.register.events({
  'submit #register-form': function (event, t) {
    event.preventDefault();
    // Get all inputs values
    var email = t.find('#account-email').value.trim();
    var password = t.find('#account-password').value.trim();
    var confirmpassword = t.find('#confirm-password').value.trim();
    //var geoloc = Geolocation.latLng();
    // Set RegExp for email
    var regEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/);

    if (password == confirmpassword) {
      if (email) {
        // Verify if email is valid
        if (regEmail.test(email)) {
          // Define user object
          var user = {
            email: email,
            password: password,
            profile:
            {
              language: "en",
              username: "",
              active: true,
              changeUserName: true,
              superAdmin: false,
              admin: false
            }
          }; //,geolocation:{lat: geoloc.lat, lng: geoloc.lng}

          Accounts.createUser(user, function(err) {
            if (!err) {
              FlowRouter.go('/');
              Modules.client.utils.displayWelcomePanel();
            } else {
              console.log(err);
              if (err.error == 400) {
                Modules.client.utils.displayPanel("register-info", "negative", "warning", "The password fields must be required.");

              } else if (err.error == 403) {
                Modules.client.utils.displayPanel("register-info", "negative", "warning", "This email address is already registered.");
              }
            }
          });
        } else {
          Modules.client.utils.displayPanel("register-info", "negative", "warning", "The email is not valid.");
        }
      } else {
        Modules.client.utils.displayPanel("register-info", "negative", "warning", "All fields are required.");
      }
    } else {
      Modules.client.utils.displayPanel("register-info", "negative", "warning", "The Password and Confirm Password fields must always be equal.");
    }
  }
});
