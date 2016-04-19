Meteor.methods({
  // Create message
  insertMessage: function(message) {
    return Messages.insert(message);
  },
  // Create userName
  createRandomUserName: function(username) {
    return Usernames.insert(username);
  },
  // Remove a userName
  removeUserName: function(id) {
    return Usernames.remove({_id: id});
  }
});
