/********************
     OnRendered
********************/

Template.chat.onRendered(function() {
  Tracker.autorun(function () {
    // Auto scroll to bottom on cursor change
    var messages = Messages.find().fetch();
    var $someItem = $('#chat-info-bottom');

    console.log("Scroll");
//    $(window).scrollTop($someItem.offset().top);
//    $('div.messages').scrollTop($('div.messages')[0].scrollHeight);
    var heightMessages = $('div.messages').height();
    console.log($('div.messages')[0].scrollHeight);
//    $('div.messages').scrollTop($('div.messages')[0].scrollHeight);
    $('div.messages').animate({
        scrollTop: $('#test').css('top')
    }, heightMessages);
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
    return Meteor.users.find({_id: userId});
  },
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  }
});
