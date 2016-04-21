/********************
       EVENTS
********************/

Template.messages.events({

});

/********************
       HELPERS
********************/

Template.messages.helpers({
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  }
});
