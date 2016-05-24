Meteor.publish('users', function() {
  return Meteor.users.find({"profile.superAdmin": false});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({});
  // OLD return Meteor.users.find({ "status.online": true });
});
