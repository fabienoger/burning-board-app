/********************
     OnRendered
********************/

Template.chat.onRendered(function() {
  Tracker.autorun(function () {
    // Auto scroll to bottom on cursor change
    var messages = Messages.find().fetch();
    var $someItem = $('#chat-info-bottom');

    // AutoScroll to bottom
    setTimeout(function() {
      var messageWindow = $("div.messages");
      var scrollHeight = messageWindow.prop("scrollHeight");
      messageWindow.stop().animate({scrollTop: scrollHeight}, 200 || 0);
    }, 50);
  });
});


/********************
       EVENTS
********************/

Template.chat.events({
  // Form processing
  'submit #send-message-form': function(e, t) {
    e.preventDefault();
    var $message = t.find('#message-input');

    // Check if message != null
    if ($message.value.trim()) {
      var message = {
        text: $message.value.trim(),
        createdAt: new Date(),
        createdBy: Meteor.userId(),
        channelId: null
      }
      // Call insertMessage method
      Meteor.call("insertMessage", message, function(error, result) {
        if (error) {
          console.error("insertMessage", error);
        } else {
          Modules.client.utils.displayPanel("message-info", "positive", "warning", "The message has been sent.");
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
  // Return the user with the given _id
  getUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  },
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  }
});
