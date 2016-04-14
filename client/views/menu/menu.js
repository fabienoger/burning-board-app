/*********************
      OnRENDERED
*********************/

Template.menu.onRendered(function() {
  // Initialize dropdown menu users
  $('.ui.dropdown').dropdown({
  });
});

/*********************
        EVENTS
*********************/

Template.menu.events({
  // Show modal create username
  'click #create-username': function(e, t) {
    $('.ui.small.modal.create-username').modal('show');
  },
  // Logout
  'click #logout' : function(e, tmpl) {
    Meteor.logout(function(error, tmpl) {
      if (error) {
        console.log(error);
      }
      FlowRouter.go('/');
    })
  }
});

/*********************
        HELPERS
*********************/

Template.menu.helpers({
  // Return true if currentUser is admin else return false
  ifAdmin: function() {
    // Initialize dropdown menu users
    $('.ui.dropdown').dropdown();
    if (Meteor.user().profile.admin)
      return true;
    else
      return false;
  }
});
