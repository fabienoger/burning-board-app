/********************
       EVENTS
********************/

Template.channel.events({
  // Set current Channel ReactiveVar
  'click .channel': function(e, t) {
    Modules.client.channels.current.set(this.name);
  }
});

/********************
       HELPERS
********************/

Template.channel.helpers({
  // Return active if currentChannel is equal to this channel
  active: function() {
    var currentChannel = Modules.client.channels.current.get();
    if (currentChannel == this.name) {
      return "active";
    } else {
      return "";
    }
  }
});
