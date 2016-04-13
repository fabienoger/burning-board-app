Meteor.methods({
  // Create message
  insertMessage: function(message) {
    return Messages.insert(message);
  },
  // Create userName
  createRandomUserName: function(username) {
    var userNameId = Usernames.insert(feedBack);
    return userNamId;
  }
});
