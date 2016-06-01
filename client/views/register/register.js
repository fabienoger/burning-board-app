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

    if (email && password && confirmpassword) {
      if (password == confirmpassword) {
        // Verify if email is valid
        if (regEmail.test(email)) {
          // Define user object
          var user = {
            email: email,
            password: password,
            profile:
            {
              language: "fr",
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
              sAlert.success(TAPi18n.__("welcome_youre_login"));
            } else {
              console.log(err);
              if (err.error == 400) {
                sAlert.success(TAPi18n.__("passwords_not_equals"));
              } else if (err.error == 403) {
                sAlert.warning(TAPi18n.__("email_already_exist"));
              }
            }
          });
        } else {
          sAlert.warning(TAPi18n.__("invalid_email"));
        }
      } else {
        sAlert.warning(TAPi18n.__("passwords_not_equals"));
      }
    } else {
      sAlert.warning(TAPi18n.__("fields_are_required"));
    }
  }
});
