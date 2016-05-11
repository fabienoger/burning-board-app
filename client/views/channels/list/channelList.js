/********************
       EVENTS
********************/

Template.channelList.events({
  // Open the create Channel modal
  'click #displayCreateChannel': function(e, t) {
    $('.ui.small.modal.create-channel').modal('show');
    $('.ui.checkbox').checkbox("set checked");
  }
});

/********************
       HELPERS
********************/

Template.channelList.helpers({
  // Return all channels
  privateChannels: function() {
    if (Meteor.user().profile.admin) {
      return Channels.find({$and: [
        {public: false}
      ]}).fetch();
    }
    return Channels.find({$and: [
      {public: false},
      {members: {$in: [Meteor.userId()]}}
    ]}).fetch();
  },
  // Return all public channels
  publicChannels: function() {
    return Channels.find({public: true}).fetch();
  },
  // Return the number of channels
  nbChannels: function() {
    return Channels.find().count();
  }
});
