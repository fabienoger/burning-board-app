/********************
     OnRendered
********************/

Template.chat.onRendered(function() {
  Tracker.autorun(function () {
    // Auto scroll to bottom on cursor change
    var messages = Messages.find().fetch();
    var $someItem = $('#chat-info-bottom');

    $(window).scrollTop($someItem.offset().top);
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
  // Return the user with the given _id
  getUser: function(userId) {
    return Meteor.users.find({_id: userId});
  },
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  }
});
