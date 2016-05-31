/********************
      OnRENDERED
********************/

Template.channelForm.onRendered(function() {
  Tracker.autorun(function() {
    var channel = Modules.client.channels.updated.get();
    // Initialize ui elements
    $('.ui.checkbox').checkbox();
    $('.ui.dropdown').dropdown("refresh");
  });
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
    if (updatedChannel && updatedChannel.createdBy != Meteor.userId()) {
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
            sAlert.error(TAPi18n.__("something_went_wrong"));
          } else {
            if (result.numberAffected == 1) {
              // Close modal
              $(".channel-form-modal.ui.modal").modal("hide");
              // Redirect
              FlowRouter.go("/channels/" + updatedChannel.name);
              // Display success message
              sAlert.success(TAPi18n.__("channel_successfully_updated", updatedChannel.name));
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
              if (err.error == "invalid-object") {
                // Display success message
                sAlert.error(TAPi18n.__("something_went_wrong"));
              } else if (err.error == "channel-name-to-long") {
                // Display success message
                sAlert.warning(TAPi18n.__("channel_name_too_long"));
              } else if (err.error == "channel-name-exist") {
                // Display success message
                sAlert.warning(TAPi18n.__("channel_name_already_exist", findChannel.name));
              } else {
                // Display success message
                sAlert.error(TAPi18n.__("something_went_wrong"));
              }
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
              sAlert.success(TAPi18n.__("channel_successfully_created", channel.name));
            }
          });
        } else {
          // Display warning message
          sAlert.warning(TAPi18n.__("channel_name_already_exist", findChannel.name));
        }
      }
    } else {
      // Display warning message
      sAlert.warning(TAPi18n.__("fields_are_required"));
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
