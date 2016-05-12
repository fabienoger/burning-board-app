/********************
     OnRENDERED
********************/

Template.channel.onRendered(function() {
  // Focus input
  setTimeout(function() {
    document.getElementById("nameChannel").focus();
  }, 200);
});


/********************
       EVENTS
********************/

Template.channel.events({
  // Set current Channel ReactiveVar
  'click .channel': function(e, t) {
    Modules.client.channels.current.set(this.channel.name);
  },
  // Open modal for confirm remove channel
  'click .remove-channel': function(e, t) {
    $('.ui.basic.remove-channel.modal').modal({
      closable  : true,
      onDeny    : function(){
        $('.ui.basic.remove-channel.modal').modal("hide");
        return false;
      },
      onApprove : function() {
        // check if dataset & user is the owner or an admin
        if (e.target.dataset.channelname) {
          var channel = Channels.findOne({name: e.target.dataset.channelname});
          if (Meteor.user().profile.admin || Meteor.userId() == channel.createdBy) {
            // Call removeChannel method
            Meteor.call("removeChannel", channel.name, function(err, result) {
              if (err) {
                console.err("removeChannel ", err);
              } else {
                // Display information message
                if (result != 0) {
                  Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "Channel was successfully removed ! <i class='icon smile'></i>");
                } else {
                  Modules.client.utils.displayPanel("message-info", "negative", "warning sign", "Channel not removed ! <i class='icon meh'></i>");
                }
              }
            });
          }
        }
      }
    }).modal('show');
  }
});

/********************
       HELPERS
********************/

Template.channel.helpers({
  // Return true if currentUser is authorized to remove this channel
  iCanRemove: function() {
    var channel = Channels.findOne({name: this.channel.name});
    if (channel) {
      if (Meteor.userId() == channel.createdBy || Meteor.user().profile.admin
        && channel.name != "random" && channel.name != "general") {
        return true;
      }
    }
    return false;
  },
  // Return active if currentChannel is equal to this channel
  active: function() {
    var currentChannel = Modules.client.channels.current.get();
    if (currentChannel == this.channel.name) {
      return "active";
    } else {
      return "";
    }
  }
});
