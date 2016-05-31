Meteor.methods({
  // new User
  newUser: function(doc) {
    return Accounts.createUser(doc);
  },
  // Upsert User
  upsertUser: function(userId, object) {
    // Check if userId and object are not empty
    if (userId && object) {
      return Meteor.users.upsert({
        _id: userId,
      }, object);
    }
    throw new Meteor.Error("missing-params", "Missing 'userId' or 'object' param.");
    return;
  }
});
