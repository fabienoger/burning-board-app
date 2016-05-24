Meteor.methods({
  // Create FeedBack
  createFeedBack: function(feedBack) {
    return FeedBacks.insert(feedBack);
  }
});
