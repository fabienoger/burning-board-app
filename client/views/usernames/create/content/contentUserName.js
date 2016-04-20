/********************
        EVENTS
********************/

Template.contentCreateUserName.events({
  // Create UserName Form processing
  'submit #create-username-form': function(e, t) {
    e.preventDefault();
    var userNameInput = t.find("#username-input");

    if (userNameInput.value.trim()) {
      var userName = {
        userName: userNameInput.value.trim(),
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        taken: false
      };
      Meteor.call("createRandomUserName", userName, function(err, userNameId) {
        if (err) {
          console.error("createRandomUserName() ", err);
          Modules.client.utils.displayPanel("username-info", "negative", "warning", "Oups ! Something went wrong !");
        } else {
          Modules.client.utils.displayPanel("username-info", "positive", "checkmark", "Username was successfully created !");
          // Close modal
//          $('.create-username.ui.small.modal').modal('hide');
          // Empty userNameInput value
          userNameInput.value = "";
        }
      });
    } else {
      Modules.client.utils.displayPanel("username-info", "negative", "warning", "Username field is required !");
      // Close modal
//      $('.create-username.ui.small.modal').modal('hide');
    }
  }
});
