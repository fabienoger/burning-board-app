/********************
        EVENTS
********************/

Template.contentCreateUserName.events({
  // Create UserName Form processing
  'submit #create-username-form': function(e, t) {
    e.preventDefault();
    var userNameInput = t.find("#username-input");
    var checkUserName = Usernames.find({"userName": userNameInput.value.trim()}).fetch();

    // Check if userName exist
    if (checkUserName.length <= 0) {
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
            Modules.client.utils.displayPanel("create-username-info", "negative", "warning", "Oups ! Something went wrong !");
          } else {
            Modules.client.utils.displayPanel("create-username-info", "positive", "checkmark", "Username was successfully created !");
            // Empty userNameInput value
            userNameInput.value = "";
          }
        });
      } else {
        Modules.client.utils.displayPanel("create-username-info", "negative", "warning", "Username field is required !");
      }
    } else {
      console.log("UserName already exist !");
      Modules.client.utils.displayPanel("create-username-info", "negative", "meh", "Username already exist !");
    }
  }
});
