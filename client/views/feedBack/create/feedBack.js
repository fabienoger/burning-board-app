/************************
        RENDERED
************************/

Template.createFeedBack.rendered = function() {

}

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
          // Error display error message
          console.error("createFeedBack ", err);
          Modules.client.utils.displayPanel("feedBackInfo", "negative", "warning", "Oups ! Something went wrong !");
        } else {
          // Success display success message and empty fields
          titleFeedBack.value = "";
          messageFeedBack.value = "";
          // Close modal
          $('.ui.small.modal.create-feedBack-modal').modal('hide');
          Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "Your feedback has been sent ! Thanks You ! <i class='icon smile'></i>");
        }
      });
    } else {
      Modules.client.utils.displayPanel("feedBackInfo", "negative", "warning", "All fields are required !");
    }
  }
});

/************************
         HELPERS
************************/
