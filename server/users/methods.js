Meteor.methods({
  // new User
  newUser: function(doc) {
    // If doc is empty return Meteor.Error
    if (!doc) {
      throw new Meteor.Error("missing-param", "Missing 'doc' param.");
      return;
    }
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
