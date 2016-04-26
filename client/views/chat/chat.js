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
