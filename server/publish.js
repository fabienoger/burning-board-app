Meteor.publish('usernames', function() {
  return Usernames.find({});
});

Meteor.publish('messages', function() {
  return Messages.find({});
});

Meteor.publish('feedBacks', function() {
  return FeedBacks.find({});
});

Meteor.publish('users', function() {
  return Meteor.users.find({});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});
