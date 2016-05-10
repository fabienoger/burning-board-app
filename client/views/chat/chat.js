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
  // Add currentUser to the chat
  'click #joinChat': function(e, t) {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});
    var channelOwner = Meteor.users.findOne({_id: channel.createdBy});

    // Check is channel isn't empty
    if (channel) {
      if (channel.public) {
        var doc = {$push: {members: Meteor.userId()}};
        Meteor.call("upsertChannel", channel._id, doc, function(err, result) {
          if (err) {
            console.error("upsertChannel", err);
          } else {
            
          }
        });
      } else {
        // Display success message
        Modules.client.utils.displayPanel("message-info", "negative", "warning sign", "It's private channel ! Please contact the channel owner : @" + channelOwner.profile.username + ".");
      }
    }
  }
});

/********************
       HELPERS
********************/

Template.chat.helpers({
  // Return true if user is member of this channel
  userIsMember: function() {
    // Intialize variables
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    if (_.contains(channel.members, Meteor.userId())) {
      return true;
    } else {
      return false;
    }
  },
  // Return channel name
  getChannelName: function() {
    return Modules.client.channels.current.get();
  },
  // Return the user with the given _id
  getUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  },
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  }
});
