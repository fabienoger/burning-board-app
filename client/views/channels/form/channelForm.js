/********************
      OnRENDERED
********************/

Template.channelForm.onRendered(function() {
  $('.ui.checkbox').checkbox();
  $('.ui.dropdown').checkbox();
});

/********************
       EVENTS
********************/

Template.channelForm.events({
  // Form processing
  'submit .channel-form.ui.form': function(e, t) {
    e.preventDefault();
    // Initialize variables
    var channelId = e.currentTarget.dataset.id;
    var updatedChannel = Channels.findOne({_id: channelId});

    // Get DOM Elements
    var publicChannel = t.find("#publicChannel");
    var nameChannel = t.find("#nameChannel");
    var membersChannel = t.find("#membersChannel");

    // Create selectedMembers [] & .push selectedMembers in
    var selectedMembers = [];
    // Add currentUser and creator to members
    selectedMembers.push(Meteor.userId());
    if (updatedChannel) {
      selectedMembers.push(updatedChannel.createdBy);
    }
    _.each(membersChannel.options, function(member) {
      if (member.selected) {
        selectedMembers.push(member.value);
      }
    });

    // Check fields
    if (Meteor.userId() && nameChannel.value.trim()) {
      if (updatedChannel) {
        // Build modifier
        var doc = {
          $set: {
            name: nameChannel.value.trim(),
            members: selectedMembers,
            public: publicChannel.checked,
            lastUpdate: new Date()
          }
        };

        // Call upsertChannel method
        Meteor.call("upsertChannel", updatedChannel._id, doc, function(err, result) {
          if (err) {
            console.error("upsertChannel ", err);
            Modules.client.utils.displayPanel("channelFormInfo", "negative", "warning sign", "Oups ! Something went wrong. <i class='icon meh'></i>");
          } else {
            if (result.numberAffected == 1) {
              // Close modal
              $(".channel-form-modal.ui.modal").modal("hide");
              // Redirect
              FlowRouter.go("/channels/" + updatedChannel.name);
              // Display success message
              Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "# " + updatedChannel.name + " channel successfully updated !");
            }
          }
        });
      } else {
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
              FlowRouter.go("/channels/" + channel.name);
              // Display success message
              Modules.client.utils.displayPanel("message-info", "positive", "checkmark", "# " + channel.name + " channel successfully created !");
            }
          });
        } else {
          // Display warning message
          Modules.client.utils.displayPanel("channelFormInfo", "negative", "warning sign", "# " + findChannel.name + " channel already exists !");
        }
      }
    }
  }
});

/********************
       HELPERS
********************/

Template.channelForm.helpers({
  // Return all users
  getUsersExceptCreator: function() {
    // Get channel
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});
    var result;

    // Check if channel is not empty
    if (channel) {
      return Meteor.users.find({$and: [
        {_id: {$nin: [Meteor.userId(), channel.createdBy]}},
        {"profile.name": {$not: "Admin"}},
        {"profile.name": {$not: "Super Admin"}}
      ]}).fetch();
    }
    return Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch();
  },
  // Return true if passed userId is in members
  isMember: function(userId) {
    // Get variables
    var channelName = Modules.client.channels.current.get();
    var channel = Channels.findOne({name: channelName});

    // Check if channel is not empty
    if (channel) {
      if (_.contains(channel.members, userId)) {
        return true;
      } else {
        return false;
      }
    }
  }
});
