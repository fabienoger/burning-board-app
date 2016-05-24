Meteor.publish('feedBacks', function() {
  return FeedBacks.find({});
})
