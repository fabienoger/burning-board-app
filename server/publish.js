Meteor.publish('usernames', function() {
  return Usernames.find({});
});

Meteor.publish('channel', function(channel) {
  return Messages.find({channel: channel}, {sort: {createdAt: 1}});
});

Meteor.publish('feedBacks', function() {
  return FeedBacks.find({});
});

Meteor.publish('users', function() {
  return Meteor.users.find({$and: [
    {"profile.superAdmin": false},
    {"profile.name": {$not: "Super Admin"}},
    {"profile.name": {$not: "Admin"}}
  ]});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({});
  // OLD return Meteor.users.find({ "status.online": true });
});

Meteor.publish('channels', function () {
  return Channels.find({});
});
