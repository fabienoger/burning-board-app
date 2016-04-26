/********************
       EVENTS
********************/

Template.channelList.events({
});

/********************
       HELPERS
********************/

Template.channelList.helpers({
  // Return all channels
  channels: function() {
    return Channels.find().fetch();
  },
  // Return the number of channels
  nbChannels: function() {
    return Channels.find().count();
  }
});
