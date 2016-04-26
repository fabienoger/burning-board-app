/********************
     OnRENDERED
********************/

Template.createChannel.onRendered(function() {
  // Initialize ui elements
  $('select.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
});

/********************
       EVENTS
********************/

Template.createChannel.events({
  // Form processing
  'submit #createChannelForm': function(e, t) {
    e.preventDefault();
    // Get DOM elements
    var publicChannel = t.find("#publicChannel");
    var nameChannel = t.find("#nameChannel");
    var membersChannel = t.find("#membersChannel");

    // Create selectedMembers [] & .push selectedMembers in
    var selectedMembers = [];
    selectedMembers.push(Meteor.userId());
    _.each(membersChannel.options, function(member) {
      if (member.selected) {
        selectedMembers.push(member.value);
      }
    });

    // Check if all is defined
    if (Meteor.userId() && nameChannel.value.trim()) {
      // Find & Check if Channel name is not already taken
      var findChannel = Channels.findOne({name: nameChannel.value.trim()});
      if (!findChannel) {
        // Build Channel object
        var channel = {
          name: nameChannel.value.trim(),
          members: selectedMembers,
          public: publicChannel.checked,
          createdBy: Meteor.userId(),
          createdAt: new Date()
        };

        // Call createChannel method
        Meteor.call("createChannel", channel, function(err, result) {
          if (err) {
            console.error("createChannel ", err);
          } else {
            // Find the created Channel
            var channel = Channels.findOne({_id: result});
            // Empty fields
            nameChannel.value = "";
            $('#membersChannel').dropdown("clear");
            // Close modal
            $(".create-channel.ui.small.modal").modal("hide");
            // Redirect to new channel
            FlowRouter.go("/" + channel.name);
            // Display success message
            Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "# " + channel.name + " channel successfully created!");
          }
        });
      } else {
        Modules.client.utils.displayPanel("createChannelInfo", "negative", "warning", "This channel name is already taken ! <i class='icon frown'></i>");
      }
    } else {
      Modules.client.utils.displayPanel("createChannelInfo", "negative", "warning", "All fields are required !");
    }
  }
});

/********************
       HELPERS
********************/

Template.createChannel.helpers({
  // Return all users except the current
  getUsers: function() {
    return Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
  }
});
