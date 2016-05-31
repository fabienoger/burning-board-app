/****************************************
#####          OnRENDERED           #####
****************************************/

Template.editUser.onRendered(function() {
  Tracker.autorun(function() {
    var currentLanguage = Modules.client.user.language.get();
    setTimeout(function() {
      $('.ui.dropdown#select-language').dropdown({
        onChange: function(value, text, $selectedItem) {
          // Initialize variables
          var language = $selectedItem[0].innerText.trim();
          var lng = undefined;

          // Check if language is French or English
          if (language == "Français" || language == "French") {
            lng = "fr";
          } else if (language == "English" || language == "Anglais") {
            lng = "en";
          }

          // Check if lng is not empty
          if (lng) {
            Modules.client.utils.changeUserLanguage(lng);
          }
          $('.ui.dropdown#select-language').dropdown();
        }
      });
    }, 300);
  });
});

/****************************************
#####            HELPERS            #####
****************************************/

Template.editUser.helpers({
  // Return email of the current user
  getCurrentUserEmail: function() {
    if (Meteor.user())
      return Meteor.user().emails[0].address;
  },
  // Return current user language or false
  getLanguage: function() {
    if (Meteor.user()) {
      var language = Meteor.user().profile.language;
    } else {
      var language = Modules.client.user.language.get();
    }
    return language;
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
