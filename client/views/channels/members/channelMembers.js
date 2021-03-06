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
        var user = Meteor.users.findOne({$and: [
          {_id: id},
          {"profile.name": {$not: "Super Admin"}},
          {"profile.name": {$not: "Admin"}}
        ]});
        if (user) {
          // Check if user is Online
          if (user.status.online) {
            members.push(user);
          }
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
    var members = [];

    if (channel) {
        // Browse channel.members[] and push users to Array
      _.each(channel.members, function(id) {
        var user = Meteor.users.findOne({$and: [
          {_id: id},
          {"profile.name": {$not: "Super Admin"}},
          {"profile.name": {$not: "Admin"}}
        ]});
        // Check if user is not empty
        if (user) {
          members.push(user);
        }
      });
    }
    return members.length;
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
        if (user) {
          // Filter Admin & Super Admin
          if (user.profile.name != "Admin" && user.profile.name != "Super Admin") {
            members.push(user);
          }
        }
      });
    }
    return members;
  }
});
