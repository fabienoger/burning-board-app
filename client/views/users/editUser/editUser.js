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
      Modules.client.utils.displayPanel("info-password", "negative", "warning", "Tous les champs doivent être remplis.");
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
              Modules.client.utils.displayPanel("info-password", "negative", "lock", "Le mot de passe est incorrect.");
            }
          } else {
            // Empty input fields
            oldPassword.value = '';
            newPassword.value = '';
            confirmPassword.value = '';

            Modules.client.utils.displayPanel("info-password", "positive", "unlock", "Votre mot de passe à bien été modifié.");
          }
        });
      } else {
        Modules.client.utils.displayPanel("info-confirm-password", "negative", "lock", "Entrez le même mot de passe ci-dessus.");
      }
    } else {
      FlowRouter.go('/login');
    }
  }
});
