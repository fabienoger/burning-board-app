Meteor.methods({
  // Create FeedBack
  createFeedBack: function(feedBack) {
    if (!feedBack) {
      throw new Meteor.Error("missing-param", "Params 'feedBack'' is missing.");
      return;
    }
    return FeedBacks.insert(feedBack);
  }
});
