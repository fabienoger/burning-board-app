/****************
      EVENTS
****************/

Template.listUserNames.events({
  // Remove userName on click on close icon
  'click .remove-username': function(e, t) {
    var id = e.target.dataset.id;

    // Check if currentUser is admin
    if (Meteor.user().profile.admin) {
      // Call the removeUserName method
      Meteor.call("removeUserName", id, function(err, result) {
        if (err) {
          console.error("removeUserName ", err);
          sAlert.error(TAPi18n.__("something_went_wrong"));
        } else {
          sAlert.success(TAPi18n.__("username_successfully_removed"));
        }
      });
    } else {
      sAlert.warning(TAPi18n.__("not_admin"));
    }
  }
});

/****************
     HELPERS
****************/

Template.listUserNames.helpers({
  // Return all usernames
  getUserNames: function() {
    return Usernames.find().fetch();
  }
});
