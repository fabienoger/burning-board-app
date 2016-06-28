//import linkPreviewHelper from 'link-preview';

/********************
      OnRENDERED
********************/

Template.message.onRendered(function() {
  // Update title (asterisk) notification
  var channel = Modules.client.channels.current.get();
  document.title = "* " + channel + " | Burning Board";
});

/********************
       HELPERS
********************/

Template.message.helpers({
  // Return the user with the given _id
  getUser: function(userId) {
    return Meteor.users.findOne({_id: userId});
  },
  // Link preview
  linkPreview: function(text) {
    var preview = text;
    console.log(preview);
    return preview;
  }
});
