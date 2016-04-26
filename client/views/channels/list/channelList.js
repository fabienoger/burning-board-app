/********************
       EVENTS
********************/

Template.channelList.events({
  // Open the create Channel modal
  'click #displayCreateChannel': function(e, t) {
    $('.ui.small.modal.create-channel').modal('show');
  }
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
