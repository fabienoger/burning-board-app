/********************
     OnRendered
********************/

Template.chat.onRendered(function() {

});


/********************
       EVENTS
********************/

Template.chat.events({
  // Form processing
  'submit #send-message-form': function(e, t) {
    e.preventDefault();
    var $message = t.find('#message-input');

    console.log($message.value.trim());
    console.log(new Date());
    // Check if message != null
    if ($message.value.trim()) {
      var message = {
        text: $message.value.trim(),
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        channelId: null
      }
      // Call insertMessage method
      Meteor.call("insertMessage", message, function(result, error) {
        if (error) {
          console.log(error);
        } else {
          console.log(result);
          Modules.client.utils.displayPanel("create-vote-info", "positive", "warning", "The creation of the vote has been recorded.")
        }
        // Empty input
        $message.value = "";
      });
    } else {

    }
  }
});

/********************
       HELPERS
********************/

Template.chat.helpers({
  // Return messages
  getMessages: function() {
    return Messages.find().fetch();
  }
});
