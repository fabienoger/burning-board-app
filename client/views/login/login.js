// Connexion
Template.login.events({
  'submit #login-form': function (event, t) {
    event.preventDefault();
    // Get inputs values
    var email = t.find('#login-email').value.trim();
    var password = t.find('#login-password').value.trim();
    // Set RegExp for email
    var regEmail = new RegExp(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/);

    if (email && password) {
      if (regEmail.test(email)) {
        Meteor.loginWithPassword(email, password, function(err) {
          if (!err) {
            FlowRouter.go('/');
            sAlert.success(TAPi18n.__("youre_login"));
          } else {
            if (err.error == 403) {
              sAlert.warning(TAPi18n.__("incorrect_email_pwd"));
            } else {
              sAlert.error(TAPi18n.__("something_went_wrong"));
            }
          }
        });
      } else {
        sAlert.warning(TAPi18n.__("invalid_email"));
      }
    } else {
      sAlert.warning(TAPi18n.__("fields_are_required"));
    }
  }
});
