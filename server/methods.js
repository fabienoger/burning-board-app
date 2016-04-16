Meteor.methods({
  // Create message
  insertMessage: function(message) {
    return Messages.insert(message);
  },
  // Create userName
  createRandomUserName: function(username) {
    return Usernames.insert(username);
  }
});
