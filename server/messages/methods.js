Meteor.methods({
  // Create message
  insertMessage: function(message) {
    return Messages.insert(message);
  }
});
