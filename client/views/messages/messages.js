/********************
      OnCREATED
********************/

Template.messages.onCreated(function() {
  self = this;
  // Subscribe to the current Channel
  self.autorun(function() {
    var channel = Modules.client.channels.current.get();
    self.subscribe('messages', channel);
  });
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
