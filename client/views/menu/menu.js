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
