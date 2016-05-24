Meteor.publish('usernames', function() {
  return Usernames.find({});
});
