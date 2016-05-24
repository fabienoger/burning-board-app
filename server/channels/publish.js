Meteor.publish('channel', function(channel) {
  return Messages.find({channel: channel}, {sort: {createdAt: 1}});
});

Meteor.publish('channels', function () {
  return Channels.find({});
});
