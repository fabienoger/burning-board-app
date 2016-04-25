/************************
         RENDERED
************************/

Template.feedBacks.rendered = function() {
  // Initialize dropdown semantic-ui
  $('.ui.accordion').accordion();
}

/************************
         EVENTS
************************/

Template.feedBacks.events({

});

/************************
         HELPERS
************************/

Template.feedBacks.helpers({
  // Return all feedBacks
  getFeedBacks: function() {
    return FeedBacks.find({}).fetch().reverse();
  },
  // Return user for the given userId
  findUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  }
});
