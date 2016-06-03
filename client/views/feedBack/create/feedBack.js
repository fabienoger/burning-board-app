/************************
         EVENTS
************************/

Template.createFeedBack.events({
  // Manage data and insert in feedBack collection
  'submit #formFeedBack': function(e, t) {
    e.preventDefault();
    // Get DOM inputs
    var titleFeedBack = t.find("#titleFeedBack");
    var messageFeedBack = t.find("#messageFeedBack");

    if (titleFeedBack.value.trim() && messageFeedBack.value.trim()) {
      // Insert FeedBack in FeedBacks collection
      Meteor.call("createFeedBack", {
        title: titleFeedBack.value.trim(),
        message: messageFeedBack.value.trim(),
        userId: Meteor.userId(),
        checked: false,
        createdAt: new Date()
      }, function(err, result) {
        if (err) {
          if (err.error == "missing-param") {
            sAlert.warning(TAPi18n.__("fields_are_required"));
          } else {
            // Error display error message
            console.error("createFeedBack ", err);
            sAlert.error(TAPi18n.__("something_went_wrong"));
          }
        } else {
          // Success display success message and empty fields
          titleFeedBack.value = "";
          messageFeedBack.value = "";
          // Close modal
          $('.ui.small.modal.create-feedBack-modal').modal('hide');
          sAlert.success(TAPi18n.__("feedback_successfully_sent"));
        }
      });
    } else {
      sAlert.warning(TAPi18n.__("fields_are_required"));
    }
  }
});

/************************
         HELPERS
************************/
