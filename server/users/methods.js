Meteor.methods({
  // new User
  newUser: function(doc) {
    return Accounts.createUser(doc);
  },
  // Upsert User
  upsertUser: function(userId, object) {
    return Meteor.users.upsert({
      _id: userId,
    }, object);
  }
});
