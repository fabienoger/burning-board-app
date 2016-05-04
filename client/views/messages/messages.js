/********************
      OnCREATED
********************/

Template.messages.onCreated(function() {
  self = this;
  // Subscribe to the current Channel
  self.autorun(function() {
    var channel = Modules.client.channels.current.get();
    self.subscribe('channel', channel);
//    var conversationId = Modules.client.conversations.current.get();
//    if (channel) {
//    } else {
//      self.subscribe('privateMessages', conversationId);
//    }
  });
});

/********************
       HELPERS
********************/

Template.messages.helpers({
  // Return messages
  getMessages: function() {
    return Messages.find({}, {limit: 400}).fetch();
  },
  // Return true if is the same author to last message
  sameAuthor: function(index, userId) {
    var messages = Messages.find({}, {limit: 400}).fetch();
    if (messages[index - 1]) {
      if (messages[index - 1].createdBy == userId) {
        return true;
      } else {
        return false;
      }
    }
  }
});
