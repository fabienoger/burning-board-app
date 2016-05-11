/********************
       EVENTS
********************/

Template.channelMembers.events({

});

/********************
       HELPERS
********************/

Template.channelMembers.helpers({
  // Return the number of Online Members
  getOnlineMemberCount: function() {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});
    var members = [];

    // Check if channel
    if (channel) {
      // Browse channel.members[] and push users to Array
      _.each(channel.members, function(id) {
        var user = Meteor.users.findOne({_id: id});
        // Check if user is Online
        if (user.status.online) {
          members.push(user);
        }
      });
    }
    return members.length;
  },
  // Return the number of Members
  getMemberCount: function() {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});
    if (channel) {
      return channel.members.length;
    }
    return 0;
  },
  // Return members of channel
  getChannelMembers: function() {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});
    var members = [];

    // Check if channel
    if (channel) {
      // Browse channel.members[] and push users to Array
      _.each(channel.members, function(id) {
        var user = Meteor.users.findOne({_id: id});
        members.push(user);
      });
    }
    return members;
  }
});
