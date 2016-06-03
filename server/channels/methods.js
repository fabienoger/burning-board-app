Meteor.methods({
  // Create Channel
  createChannel: function(channel) {
    // Server validation
    if (channel) {
      // Check all properties of channel
      if (channel.name && channel.createdBy && channel.members
         && channel.createdAt) {
        // Check channel.name length is < 24 c
        if (channel.name.length < 24) {
          // Find & Check if Channel name is not already taken
          var searchChannel = Channels.findOne({name: channel.name});
          if (!searchChannel) {
            // Insert channel
            return Channels.insert(channel);
          }
          throw new Meteor.Error("channel-name-exist", "Channel name already exists.");
          return;
        }
        throw new Meteor.Error("channel-name-to-long", "Channel name is to long.");
        return;
      }
      throw new Meteor.Error("invalid-object", "Channel object is incomplete.");
      return;
    }
    throw new Meteor.Error("invalid-object", "Channel object is incomplete.");
    return;
  },
  // Remove Channel by name
  removeChannel: function(channel) {
    // Check if channel name isn't "general" OR "random"
    if (channel != "general" && channel != "random") {
      // Remove all message
      Meteor.call("removeMessage", {channel: channel});
      return Channels.remove({name: channel});
    } else {
      return 0;
    }
  },
  // upsert Channel by Id
  upsertChannel: function(id, doc) {
    // Check if 'doc' & 'id' params are defined
    if (id && doc) {
      console.log("upsertChannel");
      console.log("id: ", id);
      console.log("doc ", doc);
      return Channels.upsert({_id: id}, doc)
    }
    throw new Meteor.Error("missing-params", "Params 'id' or 'doc' is missing.");
    return;
  },
});
