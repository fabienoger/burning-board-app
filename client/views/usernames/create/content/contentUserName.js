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
            if (err.error == "missing-param") {
              sAlert.warning(TAPi18n.__("username_field_required"));
            } else {
              console.error("createRandomUserName() ", err);
              sAlert.error(TAPi18n.__("something_went_wrong"));
            }
          } else {
            sAlert.success(TAPi18n.__("username_successfully_created"));
            // Empty userNameInput value
            userNameInput.value = "";
          }
        });
      } else {
        sAlert.warning(TAPi18n.__("username_field_required"));
      }
    } else {
      sAlert.warning(TAPi18n.__("username_already_exist"));
    }
  }
});
