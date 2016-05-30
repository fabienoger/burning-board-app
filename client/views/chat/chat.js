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
  // Open sidebar
  'click #show-members': function(e, t) {
    // Call toggle function
    Modules.client.utils.toggleMembers();
  },
  // Display modal
  'click #show-settings': function(e, t) {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var updatedChannel = Channels.findOne({name: channelName});
    // Set channels.updated ReactiveVar
    Modules.client.channels.updated.set(updatedChannel);
    // Show channel form modal
    $('.channel-form-modal.ui.modal').modal("show");
  },
  // Add currentUser to the chat
  'click #joinChat': function(e, t) {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    // Check is channel isn't empty
    if (channel) {
      // Check if channel is public
      if (channel.public || Meteor.user().profile.admin) {
        // Initialize variables
        var channelOwner = Meteor.users.findOne({_id: channel.createdBy});
        var doc = {$push: {members: Meteor.userId()}};

        // Call upsertChannel method
        Meteor.call("upsertChannel", channel._id, doc, function(err, result) {
          if (err) {
            console.error("upsertChannel", err);
            sAlert.warning(TAPi18n.__("something_went_wrong"));
          } else {
            // Display success message
            sAlert.success(TAPi18n.__("welcome_channel", channel.name));
          }
        });
      } else {
        // Display error message
        sAlert.info(TAPi18n.__("its_private_channel"));
      }
    } else {
      // Display error message
      sAlert.warning(TAPi18n.__("something_went_wrong"));
    }
  }
});

/********************
       HELPERS
********************/

Template.chat.helpers({
  // Return true if the currentUser is the owner of channel or admin
  channelOwner: function() {
    // Intialize variables
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    if (channel.createdBy == Meteor.userId() || Meteor.user().profile.admin) {
      return true;
    } else {
      return false;
    }
  },
  // Return true if user is member of this channel
  userIsMember: function() {
    // Intialize variables
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    if (channel) {
      if (_.contains(channel.members, Meteor.userId())) {
        return true;
      } else {
        return false;
      }
    }
  },
  // Return channel object
  getChannel: function() {
    var channelName = Modules.client.channels.current.get();
    return Channels.findOne({name: channelName}) || false;
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
